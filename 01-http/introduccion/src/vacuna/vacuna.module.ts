import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {VacunaEntity} from "./vacuna.entity";

// @Nombre() ------> esto es un decorador
@Module({
    imports: [
        TypeOrmModule
            .forFeature(
                [
                    VacunaEntity
                ],
                'default'
            )
    ],
    controllers: [

    ],
    providers: [

    ],
})
export class VacunaModule{

}