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
    1337,
    {
        namespace: 'chat',
        cors: {
            // origin: process.env.HOST_MACHINE_URL + ':5173'
            // origin: 'http://localhost:5173'
            origin: '*'
        }
    }
)
export class ChatGateWay implements OnGatewayConnection, OnGatewayDisconnect {

    constructor(
        private readonly chatService: ChatService
    ) { }

    @WebSocketServer() server: Server;


    handleConnection(@ConnectedSocket() client: Socket) {
        console.log('connected ', client.id);
    }
    handleDisconnect(@ConnectedSocket() client: Socket) {
        console.log('Decconected', client.id);
    }

    @UseGuards(JwtTwoFactorGuard)
    @SubscribeMessage('getAllRooms')
    getAllRooms(@GetUserReq('id') userId: number) {
        return this.chatService.getAllRooms(userId);
    }
    
    @SubscribeMessage('createMessage')
    create(@MessageBody() msg: ChatDto) {
        console.log(`-----> createMessage <-----`);
        const newMsg = this.chatService.createMsg(msg, 1);
        this.server.emit('message', msg);
        return newMsg;
    }
    
    @SubscribeMessage('findAllMessages')
    findAll(@MessageBody('roomId') roomId: number) {
        console.log(`-----> findAllMessages <-----=`);
        // console.log(`data ==> ${data}`);
        return this.chatService.findAllMsgs(+roomId);
    }

    @SubscribeMessage('join')
    joinRoom(@MessageBody() msg, @ConnectedSocket() client: Socket) {
        console.log("join")
    }

    @SubscribeMessage('typing')
    async typing(@MessageBody() msg, @ConnectedSocket() client: Socket) {
        console.log("typing")
    }

}