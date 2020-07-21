import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Header,
    HttpCode,
    Param,
    Post, Put,
    Query,
    Req, Res
} from "@nestjs/common";
import {UsuarioCreateDto} from "./dto/usuario.create-dto";
import {validate, ValidationError} from "class-validator";
import {NumerosCreateDto} from "./dto/numeros.create-dto";

@Controller('calculadora-http')
export class HttpCalculadoraController{

    @Get('/guardarCookieInseguraNombre') //@HttpCode(202)
    async guardarCookkieInseguraNombre(
        @Query() parametrosConsulta,
        @Req() req,
        @Res() res
    ) {
        const  usuario = new UsuarioCreateDto()
        usuario.nombre = parametrosConsulta.nombre
        try{
            const error: ValidationError[] = await validate(usuario)
            if(error.length == 0) {
                res.cookie(
                    'Usuario',
                    parametrosConsulta.nombre,
                    {
                        secure: false
                    }
                );
                res.send({
                    mensaje: 'Nombre de usuario guardado'
                })
            }else{
                console.error('Error', error)
                throw new BadRequestException('NOmbre de Usuario inválido')
            }
        }catch (e){
            console.error('Error', e)
            throw new BadRequestException('Error en la validación del nombre de usuario')
        }
    }

    @Get('mostrarCookies')
    mostrarCookies(
        @Req() req
    ){
        const  mensaje = {
            cook: req.cookies
        }
        return mensaje;
    }

    @Get('/suma')
    @HttpCode(200)
    async suma(
        @Query() valores,
        @Req() req,
        @Res() res
    ){
        const usuario = req.cookies.Usuario
        if(usuario!=undefined){
            const numeros = new NumerosCreateDto()
            numeros.x = Number(valores.x)
            numeros.y = Number(valores.y)
            try{
                const error: ValidationError[] = await validate(numeros.x)
                const error2: ValidationError[] = await validate(numeros.y)

                if(error.length == 0 && error2.length == 0) {
                  const suma = numeros.x + numeros.y
                  res.send({
                      mensaje: 'La suma de ('+numeros.x+'+'+numeros.y+') es igual a = '+ suma
                  })
                }else{
                    console.error('Error', error)
                    throw new BadRequestException('Valores inválidos')
                }
            }catch (e) {
                console.error('Error', e)
                throw new BadRequestException('Error en la validación de numeros')
            }
        }else{
            console.log('No se a definido ningun Nombre de usuario')
        }
    }

    @Put('/resta')
    @HttpCode(201)
    async resta(
        @Body() valores,
        @Req() req,
        @Res() res
    ){
        const usuario = req.cookies.Usuario
        if(usuario!=undefined){
            const numeros = new NumerosCreateDto()
            numeros.x = Number(valores.x)
            numeros.y = Number(valores.y)
            try{
                const error: ValidationError[] = await validate(numeros.x)
                const error2: ValidationError[] = await validate(numeros.y)

                if(error.length == 0 && error2.length == 0) {
                    const resta = numeros.x - numeros.y
                    res.send({
                        mensaje: 'La suma de ('+numeros.x+'-'+numeros.y+') es igual a = '+ resta
                    })
                }else{
                    console.error('Error', error)
                    throw new BadRequestException('Valores inválidos')
                }
            }catch (e) {
                console.error('Error', e)
                throw new BadRequestException('Error en la validación de numeros')
            }
        }else{
            console.log('No se a definido ningun Nombre de usuario')
        }
    }

    @Delete('/multiplicacion')
    @HttpCode(200)
    async multiplicacion(
        @Req() req,
        @Res() res
    ){
        const usuario = req.cookies.Usuario
        if(usuario!=undefined){
            const numeros = new NumerosCreateDto()
            numeros.x = Number(req.headers.x)
            numeros.y = Number(req.headers.y)
            try{
                const error: ValidationError[] = await validate(numeros.x)
                const error2: ValidationError[] = await validate(numeros.y)

                if(error.length == 0 && error2.length == 0) {
                    const multiplicaion = numeros.x * numeros.y
                    res.send({
                        mensaje: 'La multiplicacion de ('+numeros.x+'*'+numeros.y+') es igual a = '+ multiplicaion
                    })
                }else{
                    console.error('Error', error)
                    throw new BadRequestException('Valores inválidos')
                }
            }catch (e) {
                console.error('Error', e)
                throw new BadRequestException('Error en la validación de numeros')
            }
        }else{
            console.log('No se a definido ningun Nombre de usuario')
        }
    }

    @Post('/divicion/:x/:y')
    @HttpCode(201)
    async divicion(
        @Param() valores,
        @Req() req,
        @Res() res
    ){
        const usuario = req.cookies.Usuario
        if(usuario!=undefined){
            const numeros = new NumerosCreateDto()
            numeros.x = Number(valores.x)
            numeros.y = Number(valores.y)
            try{
                const error: ValidationError[] = await validate(numeros.x)
                const error2: ValidationError[] = await validate(numeros.y)

                if(error.length == 0 && error2.length == 0) {
                    if(numeros.y!=0) {
                        const divicion = numeros.x / numeros.y
                        res.send({
                            mensaje: 'La suma de (' + numeros.x + '/' + numeros.y + ') es igual a = ' + divicion
                        })
                    }else{
                        console.error('No existe la divición para cero')
                    }
                }else{
                    console.error('Error', error)
                    throw new BadRequestException('Valores inválidos')
                }
            }catch (e) {
                console.error('Error', e)
                throw new BadRequestException('Error en la validación de numeros')
            }
        }else{
            console.log('No se a definido ningun Nombre de usuario')
        }
    }




}