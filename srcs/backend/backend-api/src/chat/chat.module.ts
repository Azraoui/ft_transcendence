import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { GameService } from 'src/game/game.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/users/user/user.service';
import { ChatService } from './chat.service';

@Module({
  controllers: [],
  providers: [
                ChatService,
                PrismaService,
                AuthService,
                JwtService,
              ]
})
export class ChatModule {}
