import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
async function bootstrap() {
  const app = await NestFactory.create(AppModule) as any;
  /*
  * Cualquier configuracion se tiene que hacer
  * antes del app.listen
   */

  app.use(cookieParser('Me gustan las poliburguer'));
  app.set('view engine', 'ejs');
  app.use(express.static('publico'));

  app.use(
      session({
        name: 'server-session-id',
        secret: 'No sera de tomar un traguito',
        resave: true,
        saveUninitialized: true,
        cookie: {secure: false},
        store: new FileStore(),
      }),
  );

  await app.listen(3001);
}

bootstrap();
