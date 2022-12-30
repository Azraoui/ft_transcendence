import { Controller, ExecutionContext, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { FortyTwoOAuthGuard } from './guard/fortytwo-oauth.guard';

@Controller('auth')

export class AuthController {

    constructor (private authService: AuthService) {}

    @UseGuards(FortyTwoOAuthGuard)
    @Get()
    async fortytwoAuth() {}

    @UseGuards(FortyTwoOAuthGuard)
    @Get('42-redirect')
    async fortyTwoAuthRedirect(@Req() req, @Res() res) {
        const userAndAcessToken =  await this.authService.fortytwoLogin(req.user);
        res.cookie('access_token', userAndAcessToken.access_token, {httpOnly: true});
        res.redirect(301, "http://localhost:5173/profile");
    }

    // @Get('user')
    // @UseGuards(AuthGuard('jwt'))
    // getUser(id: number) {
    //     return this.authService.getUser(id);
    // }
}
