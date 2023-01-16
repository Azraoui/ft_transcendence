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

    @SubscribeMessage('test')
    testGateway() {
        return "Yes it's work"
    }

    @SubscribeMessage('send-msg')
    recieveMsg(@MessageBody() msgBody: string) {
        console.log(`new message msgBody = ${msgBody}`);
    }

    @SubscribeMessage('findAllMessages')
    findAll() {
        console.log("I Was Here (;");
        // return this.chatService.findAllMsgs(roomId);
    }

}