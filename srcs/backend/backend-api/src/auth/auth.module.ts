import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ChatService } from 'src/chat/chat.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/users/user/user.service';
import { FirebaseStorageProvider } from 'src/utils/firebase-storage.provider';
import { AuthService } from './auth.service';
import { HttpExceptionFilter } from './filters';
import {FortyTwoStrategy } from './strategy';
import { JwtTwoFactorStrategy } from './strategy/jwt-twofactor.strategy';

@Module({
  imports: [ConfigModule.forRoot(), JwtModule.register({}), PrismaModule],
  controllers: [],
  providers: [
    AuthService, FortyTwoStrategy,
    PrismaService, ConfigService, JwtService,
    JwtTwoFactorStrategy, UserService, FirebaseStorageProvider,
    HttpExceptionFilter,
    ChatService
  ]
})

export class AuthModule {}
