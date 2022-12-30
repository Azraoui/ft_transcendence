import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule,
    ConfigModule.forRoot({
    isGlobal: true,  }),
    PrismaModule,
  ],
  controllers: [],
  providers: [PrismaService, JwtService, ConfigService],
})

export class AppModule {}