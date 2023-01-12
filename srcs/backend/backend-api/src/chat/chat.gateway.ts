import {
        MessageBody,
        SubscribeMessage,
        WebSocketGateway,
        WebSocketServer
    } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway()
export class ChatGateWay {

    @WebSocketServer() server: Server;

    @SubscribeMessage('newMsg')
    recieveMsg(@MessageBody() msgBody: string) {
        console.log(`new message msgBody = ${msgBody}`);
    }

}