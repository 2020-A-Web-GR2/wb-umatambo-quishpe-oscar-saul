import {BadRequestException, Controller, Delete, Get, Header, Headers, HttpCode, Param, Post} from "@nestjs/common";
/*
* http://localhost:3001/juegos-http
 */
//@Controller('juegos-http')
@Controller('juegos-http')
export class HttpJuegoController{
    @Get('hola')
    @HttpCode(201)
    holaGet(){
        throw new BadRequestException('No puede ser NOOOOOOOO!! No envia nada :(')
        //return 'HOLA GET! :P'
    }

    @Post('hola')
    @HttpCode(202)
    holaPost(){
        return 'HOLA POST! :P'
    }

    @Delete('hola')
    @HttpCode(204)
    @Header('Cache.control','none')
    @Header('EPN','probando las cosas')
    holaDelete(){
        return 'HOLA DELETE! :P'
    }

    //http://localhost:3001/juegos-http/parametros-ruta/xx/gestion/yy
    @Get('/parametros-ruta/:edad/gestion/:altura')
    parametrosRutaEjemplo(
        @Param() parametrosRuta
    ) {
        // isNaN ----> 'ABC'  true || 1234 true
        if(isNaN(parametrosRuta.edad) || isNaN(parametrosRuta.altura)){
            throw new BadRequestException('Meta números no letras :P')
        }else{
            console.log('Parametros', parametrosRuta);
            const edad = Number(parametrosRuta.edad);
            const altura = Number(parametrosRuta.altura);
            return edad + altura;
        }
    }
}
