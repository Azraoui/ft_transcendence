import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from 'express'
import { AuthService } from "../auth.service";

@Injectable()
export class JwtTwoFactorStrategy extends PassportStrategy (
    Strategy,
    'jwt-two-factor'
) {
    constructor (
        readonly config: ConfigService,
        private readonly authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => {
                return req?.cookies?.TwoFacAuthToken;
              }
            ]),
            ignoreExpiration: false,
            secretOrKey: config.get('JWT_SECRET')
        })
    }


    async validate(payload: any) {
        const user = await this.authService.getUser(payload.userId);
        if (!user?.isTwoFacAuthEnabled) {
            return user
        }
        if (payload.isTwoFacAuth) {
            return user;
        }
    }

}