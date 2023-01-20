import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatController } from './chat.controller';
import { ChatGateWay } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
  controllers: [],
  providers: [
                ChatService,
                PrismaService
              ]
})
export class ChatModule {}
