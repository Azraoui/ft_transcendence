import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { JwtTwoFactorStrategy } from 'src/auth/strategy/jwt-twofactor.strategy';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { ChatService } from 'src/chat/chat.service';
import { UserService } from 'src/users/user/user.service';
import { FirebaseStorageProvider } from 'src/utils/firebase-storage.provider';
import { TwoFactorAuthController } from './two-factor-auth.controller';
import { TwoFactorAuthService } from './two-factor-auth.service';

@Module({
    controllers: [],
    providers: [TwoFactorAuthService, UserService,
                JwtService, JwtStrategy, AuthService,
                 JwtTwoFactorStrategy,
                 FirebaseStorageProvider,
                ChatService]
})
export class TwoFactorAuthModule {}
