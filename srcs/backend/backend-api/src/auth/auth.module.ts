import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {FortyTwoStrategy } from './strategy';
import { JwtTwoFactorStrategy } from './strategy/jwt-twofactor.strategy';

@Module({
  imports: [ConfigModule.forRoot(), JwtModule.register({}), PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, FortyTwoStrategy, PrismaService, ConfigService, JwtService, JwtTwoFactorStrategy]
})

export class AuthModule {}
