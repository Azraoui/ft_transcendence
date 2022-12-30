import { Controller, ExecutionContext, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
    async fortyTwoAuthRedirect(@Req() req) {
        const userAndAcessToken =  await this.authService.fortytwoLogin(req.user);
        const request = this.context.switchToHttp().getRequest();
        request.headers['Authorization'] =  `Bearer ${userAndAcessToken.access_token}`;
        return userAndAcessToken.user;
    }

    @Get('user')
    @UseGuards(AuthGuard('jwt'))
    getUser(id: number) {
        return this.authService.getUser(id);
    }
}
