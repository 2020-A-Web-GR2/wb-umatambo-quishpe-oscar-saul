import {Module} from "@nestjs/common";
import {UsuarioController} from "./usuario.controller";
import {UsuarioService} from "./usuario.service";
import {UsuarioEntity} from "./usuario.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MascotaModule} from "../mascota/mascota.module";

// @Nombre() ------> esto es un decorador
@Module({
    imports: [
        MascotaModule,
        TypeOrmModule
            .forFeature(
                [
                    UsuarioEntity
                ],
                'default'
            ),

    ],
    controllers: [
        UsuarioController
    ],
    providers: [
        UsuarioService
    ],
})
export class UsuarioModule{

}