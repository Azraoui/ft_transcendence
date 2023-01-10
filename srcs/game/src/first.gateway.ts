import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer,   OnGatewayConnection,
  OnGatewayDisconnect } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { FirstService } from './first.service';
  
// @WebSocketGateway({ namespace: '/first'})
@WebSocketGateway(80)
export class FirstGateway implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  private clients: Socket[] = [];
  private rooms: string[] = [];

  constructor(private firstService: FirstService) {}

  async handleConnection(client: Socket, rooms: string[]) {
    console.log(client.id);
    await this.firstService.handleConnection(client, this.clients, this.wss, this.rooms);
  }

  async handleDisconnect(client: Socket) {
    await this.firstService.handleDisconnection(this.wss, client, this.clients);
}
}