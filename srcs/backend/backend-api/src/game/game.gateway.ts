import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer,   OnGatewayConnection,
  OnGatewayDisconnect } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { GameService } from './game.service';
  
// @WebSocketGateway({ namespace: '/first'})
@WebSocketGateway(80)
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  private clients: Socket[] = [];
  private rooms: string[] = [];

  constructor(private gameService: GameService) {}

  async handleConnection(client: Socket, rooms: string[]) {
    console.log(client.id);
    await this.gameService.handleConnection(client, this.clients, this.wss, this.rooms);
  }

  async handleDisconnect(client: Socket) {
    await this.gameService.handleDisconnection(this.wss, client, this.clients);
}
}