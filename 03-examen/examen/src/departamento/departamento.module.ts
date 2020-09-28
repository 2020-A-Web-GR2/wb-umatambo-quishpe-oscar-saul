import {DepartamentoService} from "./departamento.service";
import {DepartamentoEntity} from "./departamento.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {DepartamentoController} from "./departamento.controller";


@Module({
    imports: [
        TypeOrmModule
            .forFeature(
                [
                    DepartamentoEntity
                ],
                'default'
            ),

    ],
    controllers: [
        DepartamentoController
    ],
    providers: [
        DepartamentoService
    ],
})
export class DepartamentoModule{

}
