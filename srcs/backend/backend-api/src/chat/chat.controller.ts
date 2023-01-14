import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import JwtTwoFactorGuard from 'src/auth/guard/jwt-two-factor.guard';

@Controller('chat')

export class ChatController {
    constructor () {}

    @UseGuards(JwtTwoFactorGuard)
    @Get('getOldMsg/:id')
    getOldMsg(@Param('id') id) {
        console.log(`old messages`);
        // implement logic here


    }



}
