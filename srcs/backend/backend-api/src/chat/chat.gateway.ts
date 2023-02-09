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
import { GameService, oneVone } from "src/game/game.service";
import { UserService } from "src/users/user/user.service";
import { ChatService } from "./chat.service";
import { ChatDto } from "./dto";

@Injectable()
@WebSocketGateway(
	{
		namespace: 'pingpong',
		cors: {
			origin: "*"
		},
	}
)
export class ChatGateWay implements OnGatewayConnection, OnGatewayDisconnect {

	onlineUser: any[] = [];
	private clients_normal_mode: Socket[] = [];
	private clients_advanced_mode: Socket[] = [];
	private rooms: string[] = [];
	private ongameclients: Socket[] = [];
	private waitingSpectators: Socket[] = [];
	private oneVone: oneVone[] = [];
	constructor(
		private readonly chatService: ChatService,
		private readonly userService: UserService,
		private readonly gameService: GameService,

	) {}

	@WebSocketServer() server: Server;

	async handleConnection(@ConnectedSocket() client: any) {

		const user = await this.chatService.getUserFromSocket(client);
		if (user) {
			client.user = user;
			if (client.handshake.query.service == "game")
				console.log('connected to game', client.user.username);
			else 
				console.log('connected to chat', client.user.username);
			if (client.handshake.query.service == "game")
				this.gameService.handleConnection(client, this.clients_normal_mode,this.clients_advanced_mode, this.server, this.rooms, this.ongameclients, this.waitingSpectators, this.oneVone);
			else
			{
				if (user.active === "off" || user.active === "in") {
				// update user status
				this.userService.updateUserStatus(user.id, "on");
				client.user.active = "on";
				}
				this.onlineUser.push(client);
				// {
				// 	client.on("declined", (inviter)=>{
				// 	const index = this.oneVone.findIndex((cli:any) => { return (cli.inviter.user.nickname == inviter) && (cli.inviter.handshake.query.nickname == client.user.nickname) });
				// 	if (index != -1)
				// 	{
				// 		clearTimeout(oneVone[index].timeoutId);
				// 		inviter = oneVone[index].inviter;
				// 		this.oneVone.splice(index, 1);
				// 		inviter.data.manageDisconnection = "connected";
				// 		inviter.emit("declined");
				// 	}
				// 	})
				// }
			}
		}
		else {
			client.disconnect();
		}
	}

	async handleDisconnect(@ConnectedSocket() client: any) {
		if (client.handshake.query.service == "game" && client.user)
		{
			console.log('Disconnected from game', client.user.username);
			this.gameService.handleDisconnection(this.server, client, this.clients_normal_mode, this.clients_advanced_mode, this.rooms, this.ongameclients, this.waitingSpectators, this.oneVone);
		}
		else
		{
			if (this.onlineUser.find((x) => x.id === client.id))
			{
				console.log('Disconnected from chat', client.user.username);
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
				roomId: msg.roomId, // i add this to filter msg which users should see the message
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