import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import {FortyTwoStrategy } from './strategy';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [],
  providers: [AuthService, FortyTwoStrategy]
})

export class AuthModule {}
