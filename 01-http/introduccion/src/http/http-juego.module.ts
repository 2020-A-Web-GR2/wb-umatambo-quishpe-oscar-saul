import {Module} from "@nestjs/common";
import {HttpJuegoController} from "./http-juego.controller";

// @Nombre() ------> esto es un decorador
@Module({
    imports: [ ],
    controllers: [
        HttpJuegoController
    ],
    providers: [ ],
})
export class HttpJuegoModule{

}