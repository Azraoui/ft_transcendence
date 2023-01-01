import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './users/user/user.module';
import { UserService } from './users/user/user.service';
import { UserController } from './users/user/user.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [AuthModule,
    ConfigModule.forRoot({
    isGlobal: true,  }),
    PrismaModule,
    UserModule,
  ],
  controllers: [],
  providers: [PrismaService, JwtService, ConfigService, UserService, AuthService],
})

export class AppModule {}