import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { UserService } from 'src/users/user/user.service';
import { TwoFactorAuthController } from './two-factor-auth.controller';
import { TwoFactorAuthService } from './two-factor-auth.service';

@Module({
    controllers: [TwoFactorAuthController],
    providers: [TwoFactorAuthService, UserService,
                JwtService, JwtStrategy, AuthService]
})
export class TwoFactorAuthModule {}
