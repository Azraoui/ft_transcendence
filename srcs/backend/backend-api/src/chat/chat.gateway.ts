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

    onlineUser: Socket[] = [];
    constructor(
        private readonly chatService: ChatService
    ) { }

    @WebSocketServer() server: Server;

    async handleConnection(@ConnectedSocket() client: Socket) {
        console.log('connected ', client.id);
        const user = await this.chatService.getUserFromSocket(client);
        this.onlineUser.push(client);
    }

    handleDisconnect(@ConnectedSocket() client: Socket) {
        console.log('Decconected', client.id);
        if (this.onlineUser.find((x) => x === client))
        {
            const index = this.onlineUser.indexOf(client);
            this.onlineUser.splice(index, 1);
        }
    }

    @SubscribeMessage('msgToServer')
    create(@ConnectedSocket() client: Socket, @MessageBody() msg: ChatDto) {
        client.broadcast.emit('msgToClients', {msg: "Salam"})
    }

}