import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { clearInterval } from 'timers';
import { GameInfo } from './utils/gameinfo';

@Injectable()
export class FirstService {
  constructor() {}
  handleConnection(client: Socket, players: Socket[], wss: Server, rooms: string[]): void 
  {
    client.data.gameIntervalIdState = "off";
    let clientId : string;
    // Check client's token and get client Id
    /*

    */
    clientId = client.id;
    if (client.handshake.query.role == "player")
    // Add client to game database if it is their first time
    /*
    */
    this.handlePlayerConnection(client, players, wss, rooms);
    else if (client.handshake.query.role == "spectator")
      this.handleSpectatorConnection(client, rooms);
  }

  //  Spectator mode
  async handleSpectatorConnection(client: Socket, rooms: string[])
  {
    if (client.handshake.query.roomname != "none")
    {
      if (client.handshake.query.roomname)
      {
        const found = rooms.find(room => room == client.handshake.query.roomname);
        if (found) {
          client.join(client.handshake.query.roomname);
        } 
        else
          client.emit("roomnotfound");
      }
    }
    else{
    console.log ("emitted")
      client.emit("ongoinggames", rooms);}
  }

  // Function handles when player is connected to the firstGateway
  async handlePlayerConnection (client: Socket, players: Socket[], wss: Server, rooms: string[])
  {
    if (client.connected) // Proceed if the client hasn't disconnected
    {
      // If no one is waiting, add client to queue
      if (players.length == 0)
      {
        players.push(client);
        client.emit("queue");
        client.data.side = 'left';
        client.data.role = 'player';
      }
      else // If someone already in queue join him in a game with client
      {
        client.data.side = 'right';
        client.data.role = 'player';
        const second = client;
        const first = players.pop();
        // Join them
        this.joinPlayersToGame(first, second, wss, rooms);
      }
    }
}
  

  joinPlayersToGame(first: Socket, second: Socket, wss: Server, rooms: string[])
  {
    const roomname = first.id + '+' + second.id;

    // Join players to room
    first.join(roomname);
    second.join(roomname);
    first.data.roomname = roomname;
    second.data.roomname = roomname;
    rooms.push(roomname);
    // Set up opponent for both players
    first.data.opponent = second;
    second.data.opponent = first;



    // Create a GameInfo for players
    const gameinfo = new GameInfo();
  
    // Set Key events for both clients
    first.on("keyUp", () => {gameinfo.updatePaddles("left", "up");});
    first.on("keyDown", () => {gameinfo.updatePaddles("left", "down");});
    second.on("keyUp", () => {gameinfo.updatePaddles("right", "up");});
    second.on("keyDown", () => {gameinfo.updatePaddles("right", "down");});
    const intervalId = setInterval(() => {
      if (gameinfo.update() == false) 
      {
        // Broadcast new cooridnates to players in room
        wss
          .to(roomname)
          .emit('update', gameinfo.coordinates());
      } 
      else 
      {
        if (gameinfo.winner() == "left")
        {
          first.emit("uWon");
          second.emit("uLost");
        }
        else
        {
          first.emit("uLost");
          second.emit("uWon");
        }
        this.gameFinished(first, second, wss, rooms);
      }
    }, 1000/60);
    first.data.gameIntervalId = intervalId;
    second.data.gameIntervalId = intervalId;
    first.data.gameIntervalIdState = "on";
    second.data.gameIntervalIdState= "on";
  }

  async gameFinished(first: Socket, second: Socket, wss: Server, rooms: string[]) 
  {
    clearInterval(first.data.gameIntervalId);
    first.data.gameIntervalIdState = "off";
    second.data.gameIntervalIdState = "off";
    first.disconnect();
    second.disconnect();
    wss.to(first.data.roomname).emit("game has ended");
    wss.disconnectSockets(true);
    rooms.filter(room => first.data.roomname == room)
    // Add game to users history
  }

  async handleDisconnection(wss: Server, client: Socket, queue: Socket[])
  {
    // If client has a player role
    if (client.handshake.query.role == "player")
    {
      // Filter queue from client
      queue.filter(clientInQueue => clientInQueue == client);
      // If client is already in game
      if (client.data.gameIntervalId.state == "on")
      {
          clearInterval(client.data.gameIntervalId);
          wss.to(client.data.roomname).emit("OpponentLeft");
          //Add game to clients history in database
          /*
            database.clientId.games(loss, opponentId, clientScore, opponentScore);
            database.client.opponentId.games(win. clientId, OpponentScore, ClientScore);
          */
      }
    }
  }


}