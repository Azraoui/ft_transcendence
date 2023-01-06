import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { initializeFirebaseApp } from './utils/firebase';

initializeFirebaseApp();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser());
  
  app.setGlobalPrefix('api')
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  await app.listen(5000);
}
bootstrap();
