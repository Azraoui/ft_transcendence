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

    onlineUser: Record<string, any> = [];
    constructor(
        private readonly chatService: ChatService
    ) { }

    @WebSocketServer() server: Server;

    async handleConnection(@ConnectedSocket() client: Socket) {
        console.log('connected ', client.id);
        const user = await this.chatService.getUserFromSocket(client);
        if (user) {
            const membersData: Record<string, any> = {};
            membersData.client = client;
            membersData.user = user;
            this.onlineUser.push(membersData);
            this.onlineUser.forEach(member => {
                console.log(`nickName= ${member.user.nickname}, sockerId=${member.client.id}`)
            });
        }
        else {
            client.disconnect();
        }
    }

    handleDisconnect(@ConnectedSocket() client: Socket) {
        console.log('Decconected', client.id);
        if (this.onlineUser.find((x) => x.client === client))
        {
            const index = this.onlineUser.indexOf("client", client);
            if (index > -1) {
                console.log(`index = ${index}`);
                console.log(this.onlineUser);
                this.onlineUser.splice(index, 1);
            }
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