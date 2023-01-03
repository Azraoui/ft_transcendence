import { MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway()
export class TestGateWay {


    @SubscribeMessage('newMsg')
    recieveMsg(@MessageBody() msgBody: any) {
        console.log(`new message msgBody = ${msgBody}`);
    }

}