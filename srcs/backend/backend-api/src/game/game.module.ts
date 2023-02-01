import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { ChatService } from 'src/chat/chat.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';

@Module({
  imports: [],
  controllers: [],
  providers: [GameService, ChatService, PrismaService, AuthService, JwtService],
})
export class GameModule {}
