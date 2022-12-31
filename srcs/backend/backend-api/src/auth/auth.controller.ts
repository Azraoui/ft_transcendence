import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
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
        await this.authService.fortytwoLogin(req.user);
        const user = await this.authService.getUser(undefined, req.user.email);
        if (user)
        {
            const access_token = this.authService.signToken(user.id, user.username);
            res.cookie('access_token', access_token, {httpOnly: true});
            res.redirect(301, "http://localhost:5173/profile");
        }
        else res.redirect(301, "http://localhost:5173");
    }

    @Get('user')
    @UseGuards(AuthGuard('jwt'))
    getUser() {
        console.log(`http://localhost:5000/api/auth/user`);
        // return this.authService.getUser(id);
    }
}
