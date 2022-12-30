import { Controller, ExecutionContext, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUserReq } from 'src/decorator';
import { AuthService } from './auth.service';
import { FortyTwoOAuthGuard } from './guard/fortytwo-oauth.guard';

@Controller('auth')

export class AuthController {

    constructor (private authService: AuthService, private context: ExecutionContext) {}

    @UseGuards(FortyTwoOAuthGuard)
    @Get('login')
    async fortytwoAuth() {}

    @UseGuards(FortyTwoOAuthGuard)
    @Get('42-redirect')
    fortyTwoAuthRedirect(@Req() req, @GetUserReq() userReq) {
        const access_token =  this.authService.fortytwoLogin(req.user);
        const request = this.context.switchToHttp().getRequest();
        request.headers['Authorization'] = `Bearer ${access_token}`;
    }

    @Get('user')
    @UseGuards(AuthGuard('jwt'))
    getUser(id: number) {
        return this.authService.getUser(id);
    }
}
