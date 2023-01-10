import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FirstGateway } from './first.gateway';
import { FirstService } from './first.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [FirstGateway, FirstService],
})
export class AppModule {}
