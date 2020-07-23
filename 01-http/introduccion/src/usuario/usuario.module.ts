import {Module} from "@nestjs/common";
import {UsuarioController} from "./usuario.controller";

// @Nombre() ------> esto es un decorador
@Module({
    imports: [ ],
    controllers: [
        UsuarioController
    ],
    providers: [ ],
})
export class UsuarioModule{

}