import {
    ConnectedSocket,
        MessageBody,
        SubscribeMessage,
        WebSocketGateway,
        WebSocketServer
    } from "@nestjs/websockets";
import { Server } from "socket.io";
import { ChatService } from "./chat.service";

@WebSocketGateway({
    cors: {
        origin: process.env.HOST_MACHINE_URL + ':5173'
    }
})
export class ChatGateWay {

    constructor (private readonly chatService: ChatService) {}

    @WebSocketServer() server: Server;

    @SubscribeMessage('send-msg')
    recieveMsg(@MessageBody() msgBody: string) {
        console.log(`new message msgBody = ${msgBody}`);
    
    }


}