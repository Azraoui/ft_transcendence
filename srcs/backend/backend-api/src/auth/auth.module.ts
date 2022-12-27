import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategy';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [],
  providers: [AuthService, GoogleStrategy]
})
export class AuthModule {}
