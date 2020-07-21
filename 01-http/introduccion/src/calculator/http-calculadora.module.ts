import {Module} from "@nestjs/common";
import {HttpCalculadoraController} from "./http-calculadora.controller";

// @Nombre() ------> esto es un decorador
@Module({
    imports: [ ],
    controllers: [ HttpCalculadoraController],
    providers: [ ],
})
export class HttpCalculadoraModule{

}