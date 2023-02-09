import { Injectable } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Server, Socket } from 'socket.io';
import { ChatService } from 'src/chat/chat.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { clearInterval } from 'timers';
import { GameInfo } from './utils/gameinfo';
import * as moment from 'moment';
import { UserService } from 'src/users/user/user.service';



export class oneVone {
  inviter: Socket;
  timeoutId: any;
}

// chatSocket.on("invited", (inviter)=>{
//   console.log("invited by", inviter.nickname);
//   // Display invitation (inviter.nickname, inviter.piclink)
//   // If click on Decline: chat.socket.emit("declined", inviter.nickname) and stop displaying invitation
//   // If click on Accept : disconnect game_socket the use GameInvited.tsx after modifying game_socket query nickname to inviter.nickname and stop displaying invitation
// })
// chatSocket.on("expired", (inviter)=>{
//   // stop displaying invitation of inviter
// })
@Injectable()
export class GameService {
  constructor(
    private readonly chatService: ChatService,
    private readonly prismaService: PrismaService,
    private readonly userService: UserService
  ) {
  }
  async handleConnection(client: any, queue_normal: Socket[], queue_advanced: Socket[], wss: Server, rooms: string[], ongameclients: Socket[], waitingSpectators: Socket[], oneVone: oneVone[]) {
    client.data.manageDisconnection = "Checking user";

    if (client.handshake.query.role == "player")
      this.handlePlayerConnection(client, queue_normal, queue_advanced, wss, rooms, ongameclients, waitingSpectators);
    else if (client.handshake.query.role == "spectator")
      this.handleSpectatorConnection(client, rooms, ongameclients, waitingSpectators);
    else if (client.handshake.query.role == "inviting" || client.handshake.query.role == "invited")
      this.handle1v1Connection(client, wss, oneVone, rooms, ongameclients, waitingSpectators);
  }

  // 1v1 mode
  async handle1v1Connection(client: any, wss: Server, oneVone: oneVone[], rooms: string[], ongameclients: Socket[], waitingSpectators: Socket[]) {
    if (client.connected) {
      client.data.inGame = false;
      if (client.handshake.query.role == "inviting") {
        client.data.manageDisconnection = "Waiting";

        // // Set an Interval that search for the invited in all namespaces then sends the invite
        // const intervalId = setInterval(async ()=>
        // {
        //   // Finding the invited and send them the invitation
        let clients:any = await wss.fetchSockets();
        console.log("client invited: ", client.handshake.query.nickname);
        for (const cli of clients) {
          console.log(cli.user.nickname);
          if (cli.user.nickname == client.handshake.query.nickname && cli.handshake.query.service == "chat") {
            console.log("found");
            cli.emit("invited", { nickname: client.user.nickname, piclink: client.user.pictureLink });
            console.log("invitation sent to", cli.user.nickname);
            break;
          }
        }
        // }, 1000/2);
        const timeoutId = setTimeout(async () => {
          const index = oneVone.findIndex((cli) => { return cli.inviter == client });
          oneVone.splice(index, 1);
          client.data.manageDisconnection = "connected";
          client.emit("expired");
        }, 10 * 1000);
        oneVone.push({ inviter: client, timeoutId: timeoutId });
        client.data.side = "left";
        client.emit("playerInfo", {id:client.user.nickname, piclink:client.user.pictureLink, side: "left"});
      }
      else if (client.handshake.query.role == "invited") {
        const index = oneVone.findIndex((cli:any) => { return (cli.inviter.user.nickname == client.handshake.query.nickname) && (cli.inviter.handshake.query.nickname == client.user.nickname) });
        if (index != -1) {
          clearTimeout(oneVone[index].timeoutId);
          const first = oneVone[index].inviter;
          const second = client;
          oneVone.splice(index, 1);
          client.data.side = "right";
          client.emit("playerInfo", {id:client.user.nickname, piclink:client.user.pictureLink, side: "right"});
          this.joinPlayersToGame(first, second, wss, rooms, ongameclients, waitingSpectators);
        }
        else
          client.emit("expired");
      }
    }
  }

  //  Spectator mode
  async handleSpectatorConnection(client: Socket, rooms: string[], ongameclients: Socket[], waitingSpectators: Socket[]) {
    if (client.connected) // Proceed if the client hasn't disconnected
    {
      client.data.manageDisconnection = "Yes";
      client.data.room = "none";
      client.data.last_time = ((new Date()).getTime());
      // Set events
      client.on("next", () => {
        const time = ((new Date()).getTime());
        if (time - client.data.last_time > 500)
          this.findGame(client, rooms, ongameclients, waitingSpectators)
      });

      this.findGame(client, rooms, ongameclients, waitingSpectators);
    }
  }
  findGame(client: Socket, rooms: string[], ongameclients: Socket[], waitingSpectators: Socket[]) {
    if (client.data.room != "none") {
      if (rooms.length != 1) {
        const index = rooms.findIndex((r) => {
          return (r == client.data.room);
        })
        client.leave(client.data.room)
        if (rooms.length > index + 1)
          this.WatchGame(client, rooms[index + 1], ongameclients);
        else
          this.WatchGame(client, rooms[0], ongameclients);
      }
    }
    else if (rooms.length == 0) {
      client.emit("noGames");
      client.data.room = "waiting";
      waitingSpectators.push(client);
    }
    else {
      this.WatchGame(client, rooms[0], ongameclients);
    }
  }
  WatchGame(client: any, room: string, ongameclients: Socket[]) {
    let id: string[];

    // Get playersInfo and send them
    id = room.split("+");

    let player: any = ongameclients.find((cl:any) => { if (cl.user.nickname == id[0]) return 1; return 0; });
    // console.log(player);
    client.emit("playerInfo", {id:player.user.nickname, piclink:player.user.pictureLink, side: player.data.side});
    player = ongameclients.find((cl) => { if (cl.data.user.id == id[1]) return 1; return 0; });
    client.emit("playerInfo", {id:player.user.nickname, piclink:player.user.pictureLink, side: player.data.side});
    client.data.room = room;
    // Join client to room
    client.join(room);
  }

  // Function handles when player is connected to the firstGateway
  async handlePlayerConnection(client: any, queue_normal: Socket[], queue_advanced: Socket[], wss: Server, rooms: string[], ongameclients: Socket[], waitingSpectators: Socket[]) {
    if (client.connected) // Proceed if the client hasn't disconnected
    {
      console.log(client.handshake.query.mode);
      if (client.handshake.query.mode == "normal") {
        // If no one is waiting, add client to queue
        if (queue_normal.length == 0) {
          client.data.manageDisconnection = "In queue";
          queue_normal.push(client);
          client.emit("queue");
          client.data.side = "left";
          client.emit("playerInfo", {id:client.user.nickname, piclink:client.user.pictureLink, side: "left"});
        }
        else // If someone already in queue join him in a game with client
        {
          client.data.side = "right";
          client.emit("playerInfo", {id:client.user.nickname, piclink:client.user.pictureLink, side: "right"});
          const second = client;
          const first = queue_normal.pop();
          ongameclients.push(first, second);
          // Join them
          this.joinPlayersToGame(first, second, wss, rooms, ongameclients, waitingSpectators);
        }
      }
      else if (client.handshake.query.mode == "advanced") {
        // If no one is waiting, add client to queue
        if (queue_advanced.length == 0) {
          client.data.manageDisconnection = "In queue";
          queue_advanced.push(client);
          client.emit("queue");
          client.data.side = "left";
          client.emit("playerInfo", {id:client.user.nickname, piclink:client.user.pictureLink, side: "left"});
        }
        else // If someone already in queue join him in a game with client
        {
          client.data.side = "right";
          client.emit("playerInfo", {id:client.user.nickname, piclink:client.user.pictureLink, side: "right"});
          const second = client;
          const first = queue_advanced.pop();
          ongameclients.push(first, second);
          // Join them
          this.joinPlayersToGame(first, second, wss, rooms, ongameclients, waitingSpectators);
        }
      }
    }
  }

  async joinPlayersToGame(first: any, second: any, wss: Server, rooms: string[], ongameclients: Socket[], waitingSpectators: Socket[]) {
    const roomname = first.user.nickname + '+' + second.user.nickname;
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
    let gameinfo;
    if (first.handshake.query.mode == "normal")
      gameinfo = new GameInfo("normal");
    else
      gameinfo = new GameInfo("advanced");
    first.data.gameinfo = gameinfo;
    // first.data.gameinfo = gameinfo;
    second.data.gameinfo = first.data.gameinfo;
    // const gameinfo = first.data.gameinfo;

    // Set Key events for both clients
    first.on("keyUp", () => { gameinfo.updatePaddles("left", "up"); });
    first.on("keyDown", () => { gameinfo.updatePaddles("left", "down"); });
    second.on("keyUp", () => { gameinfo.updatePaddles("right", "up"); });
    second.on("keyDown", () => { gameinfo.updatePaddles("right", "down"); });

    // Changing state to "in game"
    await this.userService.updateUserStatus(first.user.id, "in");
    await this.userService.updateUserStatus(second.user.id, "in");
    // Send opponent info
    first.emit("playerInfo", {id:second.user.nickname, piclink:second.user.pictureLink, side: "right"});
    second.emit("playerInfo", {id:first.user.nickname, piclink:first.user.pictureLink, side: "left"});

    // Starting game
    const intervalId = setInterval(() => {
      if (first.data.gameinfo.update() == false) {
        // Broadcast new cooridnates to players in room
        wss
          .to(roomname)
          .emit('update', gameinfo.coordinates());
      }
      else {
        if (gameinfo.winner() == "left") {
          first.emit("uWon", "left");
          second.emit("uLost", "right");
        }
        else {
          first.emit("uLost", "left");
          second.emit("uWon", "right");
        }
        this.gameFinished(first, second, wss, rooms, ongameclients);
      }
    }, 1000 / 60);
    first.data.gameIntervalId = intervalId;
    second.data.gameIntervalId = intervalId;
    first.data.manageDisconnection = "In game";
    second.data.manageDisconnection = "In game";
    // Join Waiting spectators to room
    waitingSpectators.forEach((cli) => {
      this.WatchGame(cli, first.data.roomname, ongameclients);
    })
    waitingSpectators.length = 0;
  }

  async gameFinished(first: any, second: any, wss: Server, rooms: string[], ongameclients: Socket[]) {
    clearInterval(first.data.gameIntervalId);
    first.data.manageDisconnection = "After game";
    second.data.manageDisconnection = "After game";

    ongameclients.splice(ongameclients.findIndex((client) => { return client == first }), 1);
    ongameclients.splice(ongameclients.findIndex((client) => { return client == second }), 1);

    // Setting result for both users
    if (first.data.gameinfo.leftPaddle.score == first.data.gameinfo.winScore) {
      first.data.result = "win";
      second.data.result = "loss";
      first.leave(first.data.roomname);
      second.leave(second.data.roomname);
      wss.to(first.data.roomname).emit("Winner", "left");
    }
    else {
      first.data.result = "loss";
      second.data.result = "win";
      first.leave(first.data.roomname);
      second.leave(second.data.roomname);
      wss.to(first.data.roomname).emit("Winner", "right");
    }
    // Kick spectators out of room and Setting  them as not in room anymore
    const sockets = await wss.in(first.data.roomname).fetchSockets();
    for (const socket of sockets) {
      socket.data.room = "none";
      socket.leave(first.data.roomname);
    }
    // Remove this room
    rooms.splice(rooms.findIndex(room => { return first.data.roomname == room }), 1);
    // Add Game to user history
    await this.userService.updateUserStatus(first.user.id, "on");
    await this.userService.updateUserStatus(second.user.id, "on");
    let user1: any = {
      fullName: second.user.nickname,
      imgUrl: second.user.pictureLink,
      result: first.data.result,
      score: `${first.data.gameinfo.leftPaddle.score}:${second.data.gameinfo.rightPaddle.score}`,
      gameMode: first.handshake.query.mode,
      userId: first.user.id,
      time: moment().format('YYYY-MM-DD hh:mm:ss'),
      opponentId: second.user.id
    }
    this.setGameHistory(user1);
    let user2: any = {
      fullName: first.user.nickname,
      imgUrl: first.user.pictureLink,
      result: second.data.result,
      score: `${second.data.gameinfo.rightPaddle.score}:${first.data.gameinfo.leftPaddle.score}`,
      gameMode: second.handshake.query.mode,
      userId: second.user.id,
      time: moment().format('YYYY-MM-DD hh:mm:ss'),
      opponentId: first.user.id
    }
    this.setGameHistory(user2);
  }

  async setGameHistory(data: any) {
    const game = await this.prismaService.game.create({
      data: {
        opponent_fullName: data.fullName,
        opponent_imgUrl: data.imgUrl,
        result: data.result,
        score: data.score,
        time: data.time,
        userId: data.userId,
        gameMode: data.gameMode,
        opponentId: data.opponentId
      }
    })
  }

  async handleDisconnection(wss: Server, client: any, queue_normal: Socket[], queue_advanced: Socket[], rooms: string[], ongameclients: Socket[], waitingSpectators: Socket[], oneVone: oneVone[]) {

    // If client has a spectator role
    if (client.handshake.query.role == "spectator" && client.data.manageDisconnection != "Checking user") {
      if (client.data.room == "waiting")
        waitingSpectators.splice(waitingSpectators.findIndex((s) => { return s == client }), 1);
    }

    // If client has a player role
    else if ((client.handshake.query.role == "player" || client.handshake.query.role == "inviting" || client.handshake.query.role == "invited") && client.data.manageDisconnection != "Checking user") { 
      // Filter queue from client
      if (client.data.manageDisconnection == "In queue") {
        if (client.handshake.query.mode == "normal")
          queue_normal.splice(queue_normal.findIndex(clientInQueue => { return clientInQueue == client }), 1);

        else if (client.handshake.query.mode == "advanced")
          queue_advanced.splice(queue_advanced.findIndex(clientInQueue => { return clientInQueue == client }), 1);
      }
      // Filter inviter from oneVone
      else if (client.handshake.query.role == "inviting" && client.data.manageDisconnection == "Waiting") {
        const idx = oneVone.findIndex(cli => { return cli.inviter == client });
        const inviter = oneVone.splice(idx, 1);
        clearTimeout(inviter[idx].timeoutId);
        const clients:any = await wss.fetchSockets();
        for (const cli of clients) {
          if (cli.user.nickname == client.handshake.query.nickname) {
            cli.emit("expired", client.user.id);
            break;
          }
        }
      }
      // If client is already in game
      else if (client.data.manageDisconnection == "In game") {
        client.data.opponent.data.manageDisconnection = "After game";
        clearInterval(client.data.gameIntervalId);

        client.data.opponent.emit("OpponentLeft");
        client.data.opponent.leave(client.data.roomname);
        client.leave(client.data.roomname);

        ongameclients.splice(ongameclients.findIndex((cl) => { return cl == client }, 1));
        ongameclients.splice(ongameclients.findIndex((cl) => { return cl == client.data.opponent }, 1));

        // For spectators
        if (client.data.side == "left")
          wss.to(client.data.roomname).emit("Winner", "right");
        else
          wss.to(client.data.roomname).emit("Winner", "left");
        // Kick spectators out of room and Setting  them as not in room anymore
        const sockets = await wss.in(client.data.roomname).fetchSockets();
        for (const socket of sockets) {
          socket.data.room = "none";
          socket.leave(client.data.roomname);
        }
        // Remove this room
        rooms.splice(rooms.findIndex(room => { return client.data.roomname == room }, 1));
        // Update state
        const clients:any = await wss.fetchSockets();
        for (const cli of clients) {
          if (cli.user.id == client.user.id) {
            await this.userService.updateUserStatus(client.user.id, "on");
            break;
          }
        }
        await this.userService.updateUserStatus(client.data.opponent.user.id, "on");
        // Add Game to user history
           let user1: any = {
              fullName: client.data.opponent.user.nickname,
              imgUrl: client.data.opponent.user.pictureLink,
              result: "loss",
              score: "0:5",
              gameMode: client.handshake.query.mode,
              userId: client.user.id,
              time: moment().format('YYYY-MM-DD hh:mm:ss'),
              opponentId: client.data.opponent.user.id,
            }
            this.setGameHistory(user1);
            let user2: any = {
              fullName: client.user.nickname,
              imgUrl: client.user.pictureLink,
              result: "win",
              score: `5:0`,
              gameMode: client.handshake.query.mode,
              userId: client.data.opponent.user.id,
              time: moment().format('YYYY-MM-DD hh:mm:ss'),
              opponentId: client.user.id,
            }
            this.setGameHistory(user2);
      }
    }
  }
}