import {
    BadRequestException, Body,
    Controller,
    Delete,
    Get,
    Header,
    Headers,
    HttpCode,
    Param,
    Post,
    Query, Req, Res
} from "@nestjs/common";
import {validate, ValidationError} from "class-validator";
import {MascotaCreateDto} from "./dto/mascota.create-dto";
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

    @Get('parametros-consulta')
    parametrosConsulta(
        @Query() parametrosDeConsulta
    ) {
        console.log('parametrosDeConsulta', parametrosDeConsulta);
        if(parametrosDeConsulta.nombre!=null && parametrosDeConsulta.apellido!=null){
            //if(n.equals('')){return '= ) \t ' + a;}
            //if(a.equals('')){return n + '\t = )';}
            return parametrosDeConsulta.nombre + '\t' +parametrosDeConsulta.apellido;
        }else{
            return '= )'
        }
    }

    @Post('parametros-cuerpo')
    parametrosCuerpo(
        @Body() parametrosDeCuerpo
    ){
        console.log('ParametrosDeCuerpo', parametrosDeCuerpo)
        return 'Registro creado';
    }

    @Post('/parametros-cuerpo')
    async parametrosCuerpoEjemplo(
        @Body() parametrosCuerpo
    ) {
        const mascotaValidador = new MascotaCreateDto();
        mascotaValidador.casada = parametrosCuerpo.casada;
        mascotaValidador.edad = parametrosCuerpo.edad;
        mascotaValidador.ligada = parametrosCuerpo.ligada;
        mascotaValidador.nombre = parametrosCuerpo.nombre;
        mascotaValidador.peso = parametrosCuerpo.peso;
        try {
            const errores: ValidationError[] = await validate(mascotaValidador);
            if (errores.length > 0) {
                console.error('Error', errores);
                throw new BadRequestException('Error al validar.')
            } else {
                const mensajeCorrecto = {
                    mensaje: 'Se creo correctamente'
                }
                return mensajeCorrecto;
            }
        } catch (e) {
            console.error('Error', e);
            throw new BadRequestException('Error al validar.')
        }
    }

    @Get('guardarCookieInsegura')
    guardarCookieInsegura(
        @Query() parametrosConsulta,
        @Req() req,
        @Res() res,
    ){
        res.cookie(
            'galletaInsegura',
            'Web :3',
            {
                secure: false
            }
        );
        const mensaje = {
            mensaje: 'ok'
        }
        res.send(mensaje);
    }

    @Get('guardarCookieSegura')
    guardarCookieSegura(
        @Query() parametrosConsulta,
        @Req() req,
        @Res() res,
    ){
        res.cookie(
            'galletaSegura',
            'Web :3',
            {
                secure: true
            }
        );
        const mensaje = {
            mensaje: 'tengo hambre'
        }
        res.send(mensaje);
    }

    @Get('mostrarCookies')
    mostrarCookies(
        @Req() req
    ){
        const  mensaje = {
            sinFirmar: req.cookies,
            firmadas: req.signedCookies
        }
        return mensaje;
    }

    @Get('guardarCookieFirmada')
    guardarCookieFirmada(
        @Res() res
    ){
        res.cookie('firmada', 'poliburguer', {signed: true});
        const mensaje = {
            mensaje: 'ok'
        };
        res.send(mensaje);
    }

}
