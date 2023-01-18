import { UseGuards } from "@nestjs/common";
import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import { Server } from "socket.io";
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
export class ChatGateWay {

    constructor(
        private readonly chatService: ChatService
    ) { }

    @WebSocketServer() server: Server;

    @UseGuards(JwtTwoFactorGuard)
    @SubscribeMessage('getAllRooms')
    getAllRooms(@GetUserReq('id') userId: number) {
        return this.chatService.getAllRooms(userId);
    }

    @SubscribeMessage('createMessage')
    create(@MessageBody() msg: ChatDto) {
        const newMsg = this.chatService.createMsg(msg, 1);
        this.server.emit('message', msg);
        return newMsg;
    }

    @SubscribeMessage('findAllMessages')
    findAll(@MessageBody('roomId') roomId: number) {
        // console.log(`data ==> ${data}`);
        return this.chatService.findAllMsgs(+roomId);
    }

}