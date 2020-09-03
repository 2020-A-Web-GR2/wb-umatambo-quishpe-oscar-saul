import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieParser = require('cookie-parser');
const express = require('express');

async function bootstrap() {
  const app = await NestFactory.create(AppModule) as any;
  /*
  * Cualquier configuracion se tiene que hacer
  * antes del app.listen
   */

  app.use(cookieParser('Me gustan las poliburguer'));
  app.set('view engine', 'ejs');
  app.use(express.static('publico'));
  await app.listen(3001);
}

bootstrap();
