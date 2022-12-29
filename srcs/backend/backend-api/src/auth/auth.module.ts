import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';
import {FortyTwoStrategy } from './strategy';

@Module({
  imports: [ConfigModule.forRoot(), JwtModule.register({})],
  controllers: [],
  providers: [AuthService, FortyTwoStrategy, PrismaService]
})

export class AuthModule {}
