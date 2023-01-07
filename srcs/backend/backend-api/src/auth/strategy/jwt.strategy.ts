import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConsoleLogger, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express'
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService,private authService: AuthService) {
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
    return this.authService.getUser(payload.userId);
  }
}