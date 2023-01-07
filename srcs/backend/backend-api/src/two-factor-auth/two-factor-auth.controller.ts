import { Body, Controller, Get, HttpCode, Post, Put, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
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

        @UseGuards(JwtAuthGuard)
        @HttpCode(200)
        @Post('turn-on')
        async turnOnTwoFacAuth(
            @GetUserReq() user,
            @Body() {twoFactorAuthenticationCode} : twoFactorAuthenticationDto,
            @GetUserReq('id') id:number, @Res() res: Response) {
            
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
                this.userService.update2FAValidationStatus(id, true);
                res.cookie('TwoFacAuthToken', accessTokenCookie, {httpOnly: true});
                res.json({
                    status: true,
                })
            }
            res.end();
        }

        @UseGuards(JwtTwoFactorGuard)
        @Put('turn-off')
        async turnOffTwoFacAuth (
            @GetUserReq('id') id:number,

        ) {
            await this.userService.turnOnTwoFacAuth(id, false);
            await this.userService.setTwoAuthSecret(null, id);
            this.userService.update2FAValidationStatus(id, false);
        } 

} 
