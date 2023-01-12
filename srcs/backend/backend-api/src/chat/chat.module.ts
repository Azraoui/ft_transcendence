import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatGateWay } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
  controllers: [ChatController],
  providers: [
                ChatService,
                ChatGateWay
              ]
})
export class ChatModule {}
