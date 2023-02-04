import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer,   OnGatewayConnection,
  OnGatewayDisconnect } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { ChatService } from "src/chat/chat.service";
import { GameService } from './game.service';
import { oneVone } from "./game.service";
  
@WebSocketGateway(1337,{
    namespace: 'game',
    cors: {
      // origin: [process.env.HOST_MACHINE_URL + ':5173', "http://localhost:5173"]
      origin: "*"
    },
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  private clients_normal_mode: Socket[] = [];
  private clients_advanced_mode: Socket[] = [];
  private rooms: string[] = [];
  private ongameclients: Socket[] = [];
  private waitingSpectators: Socket[] = [];
  private oneVone: oneVone[] = [];


  constructor(private GameService: GameService, private chatService: ChatService) {}

  async handleConnection(client: Socket) {
    console.log(`game connected = ${client.id}`)
    const user = await this.chatService.getUserFromSocket(client);
    console.log(`user = ${user.nickname}`)
    if (!user) client.disconnect();
    this.GameService.handleConnection(client, this.clients_normal_mode,this.clients_advanced_mode, this.wss, this.rooms, this.ongameclients, this.waitingSpectators, this.oneVone);
  }

  async handleDisconnect(client: Socket) {
    console.log(`game disconnected = ${client.id}`)
    await this.GameService.handleDisconnection(this.wss, client, this.clients_normal_mode, this.clients_advanced_mode, this.rooms, this.ongameclients, this.waitingSpectators, this.oneVone);
}
}