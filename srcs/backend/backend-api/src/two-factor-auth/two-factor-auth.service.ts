import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { Response } from 'express';
import { authenticator } from 'otplib';
import { UserService } from 'src/users/user/user.service';
import { toFileStream } from 'qrcode'

@Injectable()

export class TwoFactorAuthService {

    constructor (private readonly userService: UserService, readonly config: ConfigService) {}
    
    public async generateTwoFacAuth(user: User) {
        // Generate Secret From otplib 
        const secret = authenticator.generateSecret();

        const twoFAuthAppName = this.config.get('TWO_FAC_AUTH_APP_NAME');
        const otpauthUrl = authenticator.keyuri(user.email, twoFAuthAppName, secret);
        
        // set secret to db
        await this.userService.setTwoAuthSecret(secret, user.id)

        return {
            secret,
            otpauthUrl
        }
    }

    public async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
        return toFileStream(stream, otpauthUrl);
    }

    public isTwoFacAuthValid(twoFacAuthCode: string, user: User) {
        return authenticator.verify({
            token: twoFacAuthCode,
            secret: user.twoFacAuthSecret
        })
    }


}
