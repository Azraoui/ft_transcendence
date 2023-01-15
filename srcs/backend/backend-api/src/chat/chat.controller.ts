import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import JwtTwoFactorGuard from 'src/auth/guard/jwt-two-factor.guard';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('chat')

export class ChatController {
    constructor(
        private readonly prismaService: PrismaService
    ) { }

    // this route for get all old messages from room
    @UseGuards(JwtTwoFactorGuard)
    @Get('getOldMsg/:id')
    async getOldMsg(@Param('id') id) {
        
        const messages = await this.prismaService.messages.findMany({
            where: {
                roomId: id
            }
        })
        console.log(`messages => ${messages}`);
        return messages;
    }
    
    
    // This route for geting all (public, protected, private) rooms with userId
    @UseGuards(JwtTwoFactorGuard)
    @Get('getAllRooms')
    async getAllRooms(userId: number) {
        const rooms = await this.prismaService.room.findMany({
            where: {
                members: {
                    hasEvery: [userId]
                }
            }
        })
        console.log(`rooms => ${rooms}`);
        return rooms;
    }



}
