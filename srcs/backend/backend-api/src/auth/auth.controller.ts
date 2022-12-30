import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FortyTwoOAuthGuard } from './guard/fortytwo-oauth.guard';

@UseGuards(FortyTwoOAuthGuard)
@Controller('auth')

export class AuthController {

    constructor (private authService: AuthService) {}

    @Get()
    async fortytwoAuth() {}


    @Get('42-redirect')
    fortyTwoAuthRedirect(@Req() req, @Res() res: Response) {
        const jwt =  this.authService.fortytwoLogin(req.user, res);
        // res.set('authorization', jwt.access_token);
        // res.json(req.user);
    }
}
