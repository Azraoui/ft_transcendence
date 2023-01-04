import { Body, Controller, Get, HttpCode, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
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
        @Get('generate')
        async register(@Res() res: Response, @GetUserReq('id') userId:number) {
            const user = await this.authService.getUser(userId);
            const {otpauthUrl} = await this.twoFacAuthService.generateTwoFacAuth(user);
            return this.twoFacAuthService.pipeQrCodeStream(res, otpauthUrl);
        }

        @UseGuards(JwtTwoFactorGuard)
        @HttpCode(200)
        @Post('turn-on')
        async turnOnTwoFacAuth(
            @GetUserReq() user,
            @Body() {twoFactorAuthenticationCode} : twoFactorAuthenticationDto,
            @GetUserReq('userId') id:number, @Res() res: Response) {
            
            const isCodeValid = this.twoFacAuthService.isTwoFacAuthValid(
                twoFactorAuthenticationCode,
                user
            );

            if (!isCodeValid) {
                res.json({
                    status: false,
                })
            }
            else
            {
                const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
                    id,
                    true
                );
                this.userService.turnOnTwoFacAuth(id, true);
                res.cookie('TwoFacAuthToken', accessTokenCookie);
                res.json({
                    status: true,
                })
            }
            res.end();
        }
}