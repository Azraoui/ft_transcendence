import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOAuthGuard } from './guard/google-oauth.guard';

@UseGuards(GoogleOAuthGuard)
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
    async googleAuth(@Req() req) {

    }

    @Get('google-redirect')
    googleAuthRedirect(@Req() req) {
        console.log(req.user);
        return this.authService.googleLogin(req);
    }

}
