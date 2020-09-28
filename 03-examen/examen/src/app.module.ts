import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DepartamentoModule} from "./departamento/departamento.module";
import {DepartamentoEntity} from "./departamento/departamento.entity";

@Module({
  imports: [
      DepartamentoModule,
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '0120saul',
      database: 'examen',
      entities: [
          DepartamentoEntity
      ],
      synchronize: true,
      dropSchema: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
