import {Module} from "@nestjs/common";
import {UsuarioController} from "./usuario.controller";
import {UsuarioService} from "./usuario.service";
import {UsuarioEntity} from "./usuario.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

// @Nombre() ------> esto es un decorador
@Module({
    imports: [
        TypeOrmModule
            .forFeature(
                [
                    UsuarioEntity
                ],
                'default'
            )
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