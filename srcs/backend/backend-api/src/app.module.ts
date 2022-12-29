import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [AuthModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtService, ConfigService],
})

export class AppModule {}
