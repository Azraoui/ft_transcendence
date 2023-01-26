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
import { Server, Socket } from "socket.io";
import { UserService } from "src/users/user/user.service";
import { ChatService } from "./chat.service";
import { ChatDto } from "./dto";

@Injectable()
@WebSocketGateway(
	{
		namespace: 'chat',
		cors: {
			// origin: process.env.HOST_MACHINE_URL + ':5173'
			// origin: 'http://localhost:5173'
			origin: '*'
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

	handleDisconnect(@ConnectedSocket() client: Socket) {
		console.log('Decconected', client.id);
		if (this.onlineUser.find((x) => x.id === client.id))
		{
			const index = this.onlineUser.indexOf(client);
			if (index > -1) {
				this.onlineUser.splice(index, 1);
			}
			// if (this.onlineUser.find((x) => x.user.id === ))
		}
	}

	@SubscribeMessage('msgToServer')
	create(@ConnectedSocket() client: Socket, @MessageBody() msg: ChatDto) {
		console.log(`msg  =  ${msg.text}`)
		let obj = {
			senderId: 1,
			senderImage: "https://letsenhance.io/static/334225cab5be263aad8e3894809594ce/75c5a/MainAfter.jpg",
			nickName: "waloMayDi3",
			text: msg.text,
			side: "left",
			messageId: 99,
		}
		const user  =  this.onlineUser.find((x) => x.id === client.id);
		if (user)
			this.chatService.createMsg(msg, user.user.id);
		// client.emit('msgToClients', obj)
		this.server.emit('msgToClients', obj);
		this.onlineUser.forEach(member => {
			console.log(`nickName= ${member.user.nickname}, sockerId=${member.client.id}`)
		});
	}
}