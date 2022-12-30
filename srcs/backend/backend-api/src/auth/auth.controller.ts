import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { FortyTwoOAuthGuard } from './guard/fortytwo-oauth.guard';

@UseGuards(FortyTwoOAuthGuard)
@Controller('auth')

export class AuthController {

    constructor (private authService: AuthService) {}

    
    @Get()
    async fortytwoAuth(@Req() req) {}


    @Get('42-redirect')
    fortyTwoAuthRedirect(@Req() req) {
        return this.authService.fortytwoLogin(req.user);
    }
}
