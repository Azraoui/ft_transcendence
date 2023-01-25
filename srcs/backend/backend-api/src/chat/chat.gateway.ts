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
		client.broadcast.emit('msgToClients', {msg: "Salam"})
		this.onlineUser.forEach(member => {
			console.log(`nickName= ${member.user.nickName}, sockerId=${member.client.id}`)
		});
	}
}