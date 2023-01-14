import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatDto } from './dto';

@Injectable()
export class ChatService {
    constructor (private prismaService: PrismaService) {}

    createMsg(msgData: ChatDto) {
        
    }

    findAllMsgs() {

    }
}
