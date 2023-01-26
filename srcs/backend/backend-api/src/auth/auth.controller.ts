import { Controller, Get, Req, Res, UseFilters, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { ChatGateWay } from 'src/chat/chat.gateway';
import { GetUserReq } from 'src/decorator';
import { UserService } from 'src/users/user/user.service';
import { AuthService } from './auth.service';
import { HttpExceptionFilter } from './filters';
import { FortyTwoOAuthGuard } from './guard/fortytwo-oauth.guard';
import {JwtTwoFactorGuard} from './guard/jwt-two-factor.guard';
import { JwtAuthGuard } from './guard/jwt.guard';

@Controller('auth')

export class AuthController {

    constructor (private authService: AuthService,
        private userSerivce: UserService,
        private chatGateway: ChatGateWay,
        ) {}

    @UseGuards(FortyTwoOAuthGuard)
    @UseFilters(new HttpExceptionFilter())
    @Get() // http://10.11.6.11:5000/api/auth/
    async fortytwoAuth() {}
    
    @UseGuards(FortyTwoOAuthGuard)
    // @UseFilters(new HttpExceptionFilter())
    @Get('42-redirect') // http://10.11.6.11:5000/api/auth/42-redirect/ 42 redirect url
    async fortyTwoAuthRedirect(@Req() req, @Res() res: Response) {
        await this.authService.fortytwoLogin(req.user);
        const user = await this.authService.getUser(undefined, req.user.email);
        if (user)
        {
            // const access_token = await this.authService.signToken(user.id, user.username);
            const access_token = await this.authService.getCookieWithJwtAccessToken(user.id);
            res.cookie('TwoFacAuthToken', access_token, {httpOnly: false});
            res.redirect(301, process.env.HOST_MACHINE_URL + ':5173/profile');
        }
        else res.redirect(301, process.env.HOST_MACHINE_URL + ':5173');
        res.end();
    } 

    @UseGuards(JwtTwoFactorGuard)
    @Get('log-out')
    async logOut(@Req() req, @Res() res: Response) {
        const user = await this.authService.getUser(undefined, req.user.email);
        if (user)
        {
            // this.chatGateway.handleDisconnect(this.chatGateway.onlineUser[0].client)
            res.clearCookie('TwoFacAuthToken')
            this.userSerivce.update2FAValidationStatus(user.id, false);
            res.json({
                logout: true,
            })
            res.end()
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('status')
    async getStatus(@GetUserReq('id') userId) {
        // const user =  await this.authService.getUser(userId);
        return await this.userSerivce.getUserProfile(userId);
    }
 
}
