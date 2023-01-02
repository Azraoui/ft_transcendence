import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { GetUserReq } from 'src/decorator';
import { TwoFactorAuthService } from './two-factor-auth.service';

@Controller('2fa')
export class TwoFactorAuthController {

    constructor (
        private readonly twoFacService: TwoFactorAuthService,
        private readonly authService: AuthService,
        ) {}

        @UseGuards(JwtAuthGuard)
        @Post('generate')
        async register(@Res() res: Response, @GetUserReq('id') userId:number) {
            const user = await this.authService.getUser(userId);
            const {otpauthUrl} = await this.twoFacService.generateTwoFacAuth(user);
            return this.twoFacService.pipeQrCodeStream(res, otpauthUrl);
        }

}
