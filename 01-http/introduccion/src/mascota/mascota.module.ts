import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MascotaEntity} from "./mascota.entity";
import {MascotaSevice} from "./mascota.sevice";

// @Nombre() ------> esto es un decorador
@Module({
    imports: [
        TypeOrmModule
            .forFeature(
                [
                    MascotaEntity
                ],
                'default'
            )
    ],
    controllers: [

    ],
    providers: [
        MascotaSevice
    ],
    exports:[
        MascotaSevice
    ]
})
export class MascotaModule{

}