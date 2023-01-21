import { UseGuards } from "@nestjs/common";
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
import JwtTwoFactorGuard from "src/auth/guard/jwt-two-factor.guard";
import { GetUserReq } from "src/decorator";
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

    constructor(
        private readonly chatService: ChatService
    ) { }

    @WebSocketServer() server: Server;

    async handleConnection(@ConnectedSocket() client: Socket) {
        console.log('connected ', client.id);
        const user = await this.chatService.getUserFromSocket(client);
    }

    handleDisconnect(@ConnectedSocket() client: Socket) {
        console.log('Decconected', client.id);
    }

    @SubscribeMessage('msgToServer')
    create(@MessageBody() msg: ChatDto) {

    }


}