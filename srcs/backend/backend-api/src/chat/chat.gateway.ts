import { Injectable } from "@nestjs/common";
import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer
} from "@nestjs/websockets";
import { Room } from "@prisma/client";
import { Server, Socket } from "socket.io";
import { UserService } from "src/users/user/user.service";
import { ChatService } from "./chat.service";
import { ChatDto } from "./dto";

@Injectable()
@WebSocketGateway(
	{
		namespace: 'chat',
		cors: {
			origin: "*"
		},
	}
)
export class ChatGateWay implements OnGatewayConnection, OnGatewayDisconnect {

	onlineUser: any[] = [];
	constructor(
		private readonly chatService: ChatService,
		private readonly userService: UserService
	) {}

	@WebSocketServer() server: Server;

	async handleConnection(@ConnectedSocket() client: any) {
		console.log('connected ', client.id);
		const user = await this.chatService.getUserFromSocket(client);
		if (user) {
			client.user = user;
			if (user.active === "off") {
				// update user status
				this.userService.updateUserStatus(user.id, "on");
				client.user.active = "on";
			}
			this.onlineUser.push(client);
		}
		else {
			client.disconnect();
		}
	}

	async handleDisconnect(@ConnectedSocket() client: Socket) {
		console.log('Decconected', client.id);
		if (this.onlineUser.find((x) => x.id === client.id))
		{
			const user = await this.chatService.getUserFromSocket(client);
			if (!user) return;
			const index = this.onlineUser.indexOf(client);
			if (index > -1) {
				this.onlineUser.splice(index, 1);
				if (this.onlineUser.indexOf(client) === -1)
					this.userService.updateUserStatus(user.id, "off");
			}
		}
	}

	@SubscribeMessage('msgToServer')
	async create(@ConnectedSocket() client: Socket, @MessageBody() msg: ChatDto) {
		// this.server.removeAllListeners("msgToClients");
		// this.server.removeAllListeners("msgToServer");
		console.log(`msg  =  ${msg.text}`)
		console.log(`roomId  =  ${msg.roomId}`)
		const online = this.onlineUser.find((x) => x.id === client.id);
		if (online)
		{
			let type: string = (await this.chatService.getRoomType(msg.roomId)).valueOf();

			const room: Room = await this.chatService.getRoom(msg.roomId);
			const status: string = this.chatService.findUserStatusInRoom(online.user.id, room);
			if (status === "blocked" || status === "notFound") return;
			if ((await this.chatService.findMutedStatus(online.user.id, msg.roomId)).valueOf()){
				client.emit('muteNotification', {duration: (await this.chatService.getRestTime(online.user.id, msg.roomId)).valueOf()});
				return;
			}
			const  msgData = await this.chatService.createMsg(msg, online.user.id);
			let obj = {
				senderId: online.user.id,
				senderImage: online.user.pictureLink,
				nickName: online.user.nickname,
				text: msg.text,
				side: "",
				messageId: msgData.id,
				type: type
			}
			const roomName = `<${msg.roomId}_${online.user.id}>`;
			for (let i = 0; i < this.onlineUser.length; i++) { // join room members in room
				const status: string = this.chatService.findUserStatusInRoom(this.onlineUser[i].user.id, room);
				if (status === "blocked" || status === "notFound") continue;
				// if ((await this.chatService.findMutedStatus(this.onlineUser[i].user.id, msg.roomId)).valueOf()) continue;
				this.onlineUser[i].join(roomName);
			}
			this.server.to(roomName).emit('msgToClients', obj);
			// for (let i = 0; i < this.onlineUser.length; i++) {
			// 	this.onlineUser[i].leave(roomName)
			// }
		}
	}
}