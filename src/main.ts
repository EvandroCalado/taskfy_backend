import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.use(cookieParser(config.getOrThrow<string>('COOKIES_SECRET')));
  app.enableCors({
    origin: config.getOrThrow<string>('APPLICATION_ALLOWED_ORIGINS'),
    credentials: true,
    exposedHeaders: ['Set-Cookie'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(config.getOrThrow<number>('APPLICATION_PORT'));
}
void bootstrap();
