import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { initializeFirebaseApp } from './utils/firebase';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import {renderFile} from 'ejs'
import { join } from 'path';

initializeFirebaseApp();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser());
  app.setGlobalPrefix('api')
  
  // this lines for render the game
  app.use('/api/game', express.static(join(__dirname, '..','views')));
  app.useStaticAssets(join(__dirname, '..', 'views'));
  app.engine('html', renderFile)
  app.setViewEngine('html');
  // -----------

  app.enableCors({
    origin:  'http://localhost:5173',
    credentials: true,
  });
  await app.listen(5000);
}
bootstrap();
