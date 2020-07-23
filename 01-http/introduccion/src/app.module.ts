import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";
import {HttpCalculadoraModule} from "./calculator/http-calculadora.module";
import {UsuarioModule} from "./usuario/usuario.module";

@Module({
  imports: [
      HttpCalculadoraModule,
      HttpJuegoModule,
      UsuarioModule
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
