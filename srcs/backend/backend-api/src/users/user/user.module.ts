import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { HttpExceptionFilter } from 'src/auth/filters';
import { JwtTwoFactorStrategy } from 'src/auth/strategy/jwt-twofactor.strategy';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { FirebaseStorageProvider } from 'src/utils/firebase-storage.provider';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    JwtService,
    JwtStrategy,
    AuthService,
    JwtTwoFactorStrategy,
    FirebaseStorageProvider,
    HttpExceptionFilter
  ]
})
export class UserModule {}
