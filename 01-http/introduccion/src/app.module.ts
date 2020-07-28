import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";
import {HttpCalculadoraModule} from "./calculator/http-calculadora.module";
import {UsuarioModule} from "./usuario/usuario.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario/usuario.entity";

@Module({
  imports: [
      HttpCalculadoraModule,
      HttpJuegoModule,
      UsuarioModule,
      TypeOrmModule.forRoot({
          name: 'default',
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '0120saul',
          database: 'ejemplo',
          entities: [
                UsuarioEntity
          ],
          synchronize: true,
          dropSchema: false,
      }),
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
