import { Body, Controller, HttpCode, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import JwtTwoFactorGuard from 'src/auth/guard/jwt-two-factor.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { GetUserReq } from 'src/decorator';
import { UserService } from 'src/users/user/user.service';
import { twoFactorAuthenticationDto } from './dto';
import { TwoFactorAuthService } from './two-factor-auth.service';

@Controller('2fa')
export class TwoFactorAuthController {
    constructor (
        private readonly twoFacAuthService: TwoFactorAuthService,
        private readonly authService: AuthService,
        private readonly userService: UserService,
        ) {}

        @UseGuards(JwtTwoFactorGuard)
        @Post('generate')
        async register(@Res() res: Response, @GetUserReq('id') userId:number) {
            // console.log(res);
            const user = await this.authService.getUser(userId);
            // this.userService.turnOnTwoFacAuth(userId, true);
            const {otpauthUrl} = await this.twoFacAuthService.generateTwoFacAuth(user);
            // console.log('auth controller enable -------------');
            return this.twoFacAuthService.pipeQrCodeStream(res, otpauthUrl);
        }

        @Post('turn-on')
        @HttpCode(200)
        @UseGuards(JwtTwoFactorGuard)
        async turnOnTwoFacAuth(
            @GetUserReq() user,
            @Body() {twoFactorAuthenticationCode} : twoFactorAuthenticationDto,
            @GetUserReq('userId') id:number, @Res() res: Response) {
            
            const isCodeValid = this.twoFacAuthService.isTwoFacAuthValid(
                twoFactorAuthenticationCode,
                user
            );

            if (!isCodeValid) {
                throw new UnauthorizedException('Wrong authentication code');
            }

            const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
                id,
                true
            );

            res.cookie('TwoFacAuthToken', accessTokenCookie);
            res.json({
                status: true,
            })
            res.end();
            // res.redirect(301, 'http://localhost:5173/profile')
        }

}
