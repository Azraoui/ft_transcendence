import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { FortyTwoOAuthGuard } from './guard/fortytwo-oauth.guard';
import JwtTwoFactorGuard from './guard/jwt-two-factor.guard';
// import { JwtAuthGuard } from './guard/jwt.guard';

@Controller('auth')

export class AuthController {

    constructor (private authService: AuthService) {}

    @UseGuards(FortyTwoOAuthGuard)
    @Get() // http://localhost:5000/api/auth/
    async fortytwoAuth() {}

    @UseGuards(FortyTwoOAuthGuard)
    @Get('42-redirect') // http://localhost:5000/api/auth/42-redirect/ 42 redirect url
    async fortyTwoAuthRedirect(@Req() req, @Res() res: Response) {
        await this.authService.fortytwoLogin(req.user);
        const user = await this.authService.getUser(undefined, req.user.email);
        if (user)
        {
            // const access_token = await this.authService.signToken(user.id, user.username);
            const access_token = await this.authService.getCookieWithJwtAccessToken(user.id);
            res.cookie('TwoFacAuthToken', access_token, {httpOnly: true});
            res.redirect(301, "http://localhost:5173/profile");
        }
        else res.redirect(301, "http://localhost:5173");
        res.end();
    }

    @UseGuards(JwtTwoFactorGuard)
    @Get('log-out')
    async logOut(@Req() req, @Res() res: Response) {
        const user = await this.authService.getUser(undefined, req.user.email);
        if (user)
        {
            res.clearCookie('TwoFacAuthToken')
            res.json({
                logout: true,
            })
            res.end()
        }
    }

    @UseGuards(JwtTwoFactorGuard)
    @Get('status')
    getStatus() {}


    

}
