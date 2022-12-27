import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth')

export class AuthController {

    constructor (private authService: AuthService) {}

    @Post('signin')
    signIn() :string {
        return this.authService.signIn();
    }

    @Post('signup')
    signUp() :string {
        return this.authService.signUp();
    }

}
