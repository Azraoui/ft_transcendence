import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import JwtTwoFactorGuard from 'src/auth/guard/jwt-two-factor.guard';
import { GetUserReq } from 'src/decorator';
import { RoomDto } from './dto';
import { ChatService } from './chat.service';

@Controller('chat')

export class ChatController {
    constructor(
        private readonly chatService: ChatService
    ) { }

    // this route for get all old messages from room
    @UseGuards(JwtTwoFactorGuard)
    @Get('getOldMsg/:id')
    getOldMsg(@Param('id') id) {
        return this.chatService.findAllMsgs(id);
    }
    
    
    // This route for geting all (public, protected, private) rooms with userId
    @UseGuards(JwtTwoFactorGuard)
    @Get('getAllRooms')
    getAllRooms(@GetUserReq('id') userId: number) {
        return this.chatService.getAllRooms(userId);
    }
    
    
    // This route for create new room
    @UseGuards(JwtTwoFactorGuard)
    @Post('createRoom')
    createRoom(@GetUserReq('id') userId: number, @Body() body: RoomDto) {
        console.log("teetetete");
        
        return this.chatService.createRoom(userId, body);
    }
}
