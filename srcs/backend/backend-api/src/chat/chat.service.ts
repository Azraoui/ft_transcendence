import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatDto } from './dto';

@Injectable()
export class ChatService {
    constructor (private prismaService: PrismaService) {}

    createMsg(msgData: ChatDto) {
        
    }

    findAllMsgs(roomId: number) {
        console.log('find all messages <findAllMsgs>');
        return {name: 'abdellah', text: "salamo alaykom"}
        return ['hello', 'how are you', 'my name abdellah'];
    }
}
