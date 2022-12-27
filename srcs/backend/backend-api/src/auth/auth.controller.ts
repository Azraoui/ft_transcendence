import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FortyTwoOAuthGuard } from './guard/fortytwo-oauth.guard';

@UseGuards(FortyTwoOAuthGuard)
@Controller('api/auth')

export class AuthController {

    constructor (private authService: AuthService) {}

    // @Post('signin')
    // signIn() :string {
    //     return this.authService.signIn();
    // }

    // @Post('signup')
    // signUp() :string {
    //     return this.authService.signUp();
    // }

    @Get()
    fortytwoAuth(@Req() req) {

    }

    @Get('42-redirect')
    fortyTwoAuthRedirect(@Req() req) {
        console.log(req.user);
        return this.authService.fortytwoLogin(req);
    }

}
