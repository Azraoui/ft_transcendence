import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import {JwtTwoFactorGuard} from 'src/auth/guard/jwt-two-factor.guard';
import { GetUserReq } from 'src/decorator';
import { AddAdminDto, BlockDto, JoinRoomDto, MuteDto, PrivateRoomDto, RoomDto, UnMuteDto } from './dto';
import { ChatService } from './chat.service';

@Controller('chat')

export class ChatController {
    constructor(
        private readonly chatService: ChatService
    ) { }

    // this route for get all old messages from room
    @UseGuards(JwtTwoFactorGuard)
    @Get('getOldMsg/:id')
    getOldMsg(@Param('id') id, @GetUserReq('id') userId:number) {
        return this.chatService.findAllMsgs(+id, +userId);
    }

    // This route for geting all (public, protected, private) rooms with userId
    @UseGuards(JwtTwoFactorGuard)
    @Get('getAllRooms')
    getAllRooms(@GetUserReq('id') userId: number) {
        return this.chatService.getAllRooms(+userId);
    }

    @UseGuards(JwtTwoFactorGuard)
    @Get('getRoomData/:roomId')
    getMembersData(
        @Param('roomId') roomId: number,
        @GetUserReq('id') userId: number
        ) {
        return this.chatService.getRoomData(+roomId, +userId);
    }

    // This route for create new room
    @UseGuards(JwtTwoFactorGuard)
    @Post('createRoom')
    createRoom(@GetUserReq('id') userId: number, @Body() body: RoomDto) {
        return this.chatService.createRoom(+userId, body);
    }

    @UseGuards(JwtTwoFactorGuard)
    @HttpCode(HttpStatus.OK)
    @Post('joinRoom')
    joinRoom(@Body() body: JoinRoomDto, @GetUserReq('id') userId: number) {
        return this.chatService.joinRoom(body, +userId);
    }

    @UseGuards(JwtTwoFactorGuard)
    @Delete('leftRoom/:id')
    leftRoom(@Param('id') roomId: number, @GetUserReq('id') userId: number) {
        return this.chatService.leftRoom(+roomId, +userId);
    }

    @UseGuards(JwtTwoFactorGuard)
    @Get('viewMembers/:id')
    viewMembers(@Param('id') roomId: number, @GetUserReq('id') userId: number) {
        return this.chatService.viewMembers(+roomId, +userId);
    }

    @UseGuards(JwtTwoFactorGuard)
    @HttpCode(HttpStatus.OK)
    @Post('addAdmin')
    addAdmin(@GetUserReq('id') userId: number, @Body() body: AddAdminDto) {
        return this.chatService.addAdmin(body.roomId, userId, body.memberId);
    }

    @UseGuards(JwtTwoFactorGuard)
    @HttpCode(HttpStatus.OK)
    @Post('muteMember')
    muteMember(@GetUserReq('id') userId: number, @Body() body: MuteDto) {
        return this.chatService.muteMember(body.roomId, userId, body.memberId, body.duration);
    }

    @UseGuards(JwtTwoFactorGuard)
    @HttpCode(HttpStatus.OK)
    @Post('blockMember')
    blockMember(@GetUserReq('id') userId: number, @Body() body: BlockDto) {
        return this.chatService.blockMember(body.roomId, userId, body.memberId);
    }

    @UseGuards(JwtTwoFactorGuard)
    @HttpCode(HttpStatus.OK)
    @Post('unMuteMember')
    unmute(@GetUserReq('id') userId: number, @Body() body: UnMuteDto) {
        return this.chatService.unMuteMember(body.roomId, userId, body.memberId);
    }
    
    @UseGuards(JwtTwoFactorGuard)
    @HttpCode(HttpStatus.OK)
    @Get('getDirectMsgs/:id')
    getDirectMsgs(@GetUserReq('id') userId: number, @Param('id') roomId: number) {
        return this.chatService.getDirectMsgs(+userId, +roomId);
    }

    @UseGuards(JwtTwoFactorGuard)
    @HttpCode(HttpStatus.OK)
    @Post('addFriend2PrivateRoom')
    addFriend2PrivateRoom(@GetUserReq('id') userId: number, @Body() body: PrivateRoomDto) {
        return this.chatService.addFriend2PrivateRoom(+userId, +body.id, +body.roomId);
    }

}
