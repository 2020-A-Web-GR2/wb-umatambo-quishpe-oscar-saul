import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";

@Module({
  imports: [
      HttpJuegoModule
      // se importa otros modulos
  ],
  controllers: [
      // controladores de los modulos
      AppController
  ],
  providers: [
      // servicios de los modulos
      AppService
  ],
})
export class AppModule {}
