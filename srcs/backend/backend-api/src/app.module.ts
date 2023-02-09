import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './users/user/user.module';
import { UserService } from './users/user/user.service';
import { AuthService } from './auth/auth.service';
import { UserController } from './users/user/user.controller';
import { TwoFactorAuthService } from './two-factor-auth/two-factor-auth.service';
import { TwoFactorAuthController } from './two-factor-auth/two-factor-auth.controller';
import { TwoFactorAuthModule } from './two-factor-auth/two-factor-auth.module';
import { ChatModule } from './chat/chat.module';
import { FirebaseStorageProvider } from './utils/firebase-storage.provider';
import { GameService } from './game/game.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ChatGateWay } from './chat/chat.gateway';
import { ChatService } from './chat/chat.service';
import { ChatController } from './chat/chat.controller';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'views'),
      exclude: ['/api*'],
    }),
    AuthModule,
    ConfigModule.forRoot({
    isGlobal: true,  }),
    PrismaModule,
    UserModule,
    TwoFactorAuthModule,
    ChatModule,
  ],
  controllers: [ UserController,
                TwoFactorAuthController,
                ChatController,
                AuthController
              ],
  providers: [ PrismaService,
              JwtService,
              ConfigService,
              UserService,
              AuthService,
              TwoFactorAuthService,
              FirebaseStorageProvider,
              GameService,
              ChatGateWay,
              ChatService,
            ],
})

export class AppModule {}