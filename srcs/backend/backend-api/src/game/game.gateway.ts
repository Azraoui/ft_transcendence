import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer,   OnGatewayConnection,
  OnGatewayDisconnect } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { GameService } from './game.service';
import { oneVone } from "./game.service";
  
@WebSocketGateway({
    namespace: 'game',
    cors: {
      origin: [process.env.HOST_MACHINE_URL + ':5173', "http://localhost:5173"]
      // origin: "*"
    },
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  private clients: Socket[] = [];
  private rooms: string[] = [];
  private ongameclients: Socket[] = [];
  private waitingSpectators: Socket[] = [];
  private oneVone: oneVone[] = [];


  constructor(private GameService: GameService) {}

  async handleConnection(client: Socket) {
    console.log(client.id);
    this.GameService.handleConnection(client, this.clients, this.wss, this.rooms, this.ongameclients, this.waitingSpectators, this.oneVone);
  }

  async handleDisconnect(client: Socket) {
    await this.GameService.handleDisconnection(this.wss, client, this.clients, this.rooms, this.ongameclients, this.waitingSpectators, this.oneVone);
}
}