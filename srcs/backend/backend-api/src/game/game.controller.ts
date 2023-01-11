import { Controller, Get, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { GameService } from './game.service';


@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  
  @Get()
  @Render('index')
  serveGame(@Res() res: Response) {
    // res.sendFile("index.html", {
    //   root: './gameFront'
    // })
  }

}
