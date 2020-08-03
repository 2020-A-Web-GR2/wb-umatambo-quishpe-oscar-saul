import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
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
                )

                res.cookie('Puntos', 100, {signed: true})

                res.send({
                    Mensaje: 'Nombre de usuario guardado ',
                    Usuario: parametrosConsulta.nombre,
                    Puntos: 100
                })
            }else{
                console.error('Error', error)
                throw new BadRequestException('Nombre de Usuario inválido')
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
            cook: req.cookies,
            cookfirm: req.signedCookies
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
                const error: ValidationError[] = await validate(numeros)
                if(error.length == 0) {
                  const suma = numeros.x + numeros.y
                  let mens = ''
                  let puntos = req.signedCookies.Puntos - Math.abs(suma);
                  if(puntos<=0){
                      mens = req.cookies.Usuario + ' haz terminado tus puntos, se te han restablecido de nuevo';
                      puntos = 100;
                  }else{
                      mens = req.cookies.Usuario + ' te quedan ' + puntos + ' puntos'
                  }
                  res.cookie(
                        'Puntos',
                        puntos,
                        {signed: true}
                    );
                  res.send({
                        resultado: 'La suma de ('+numeros.x+'+'+numeros.y+') es igual a = '+ suma,
                        mensaje: mens
                    });

                }else{
                    console.log('Valores Inválidos')
                    res.send({
                        ERROR: 'Valores Inválidos'
                    });
                }
            }catch (e) {
                console.error('Error', e)
                throw new BadRequestException('Error en la validación de numeros')
            }
        }else{
            console.log('No se a definido ningun Nombre de usuario')
            throw new BadRequestException('No se a definido ningun Nombre de usuario')
        }
    }

    @Put('/resta')
    @HttpCode(201)
    async resta(
        @Body() valores,
        @Req() req,
        @Res() res
    ) {
        const usuario = req.cookies.Usuario
        if (usuario != undefined) {
            const numeros = new NumerosCreateDto()
            numeros.x = Number(valores.x)
            numeros.y = Number(valores.y)
            try {
                const error: ValidationError[] = await validate(numeros)
                if (error.length == 0) {
                    const resta = numeros.x - numeros.y
                    let mens = ''
                    let puntos = req.signedCookies.Puntos - Math.abs(resta);
                    if(puntos<=0){
                        mens = req.cookies.Usuario + ' haz terminado tus puntos, se te han restablecido de nuevo';
                        puntos = 100;
                    }else{
                        mens = req.cookies.Usuario + ' te quedan ' + puntos + ' puntos'
                    }
                    res.cookie(
                        'Puntos',
                        puntos,
                        {signed: true}
                    );
                    res.send({
                        resultado: 'La resta de ('+numeros.x+'-'+numeros.y+') es igual a = '+ resta,
                        mensaje: mens
                    });
                } else {
                    console.log('Valores Inválidos')
                    res.send({
                        ERROR: 'Valores Inválidos'
                    });
                }
            } catch (e) {
                console.error('Error', e)
                throw new BadRequestException('Error en la validación de numeros')
            }
        } else {
            console.log('No se a definido ningun Nombre de usuario')
            throw new BadRequestException('No se a definido ningun Nombre de usuario')
        }
    }

    @Delete('/multiplicacion')
    @HttpCode(200)
    async multiplicacion(
        @Req() req,
        @Res() res
    ) {
        const usuario = req.cookies.Usuario
        if (usuario != undefined) {
            const numeros = new NumerosCreateDto()
            numeros.x = Number(req.headers.x)
            numeros.y = Number(req.headers.y)
            try {
                const error: ValidationError[] = await validate(numeros)
                if (error.length == 0) {
                    const multiplicaion = numeros.x * numeros.y
                    let mens = ''
                    let puntos = req.signedCookies.Puntos - Math.abs(multiplicaion);
                    if(puntos<=0){
                        mens = req.cookies.Usuario + ' haz terminado tus puntos, se te han restablecido de nuevo';
                        puntos = 100;
                    }else{
                        mens = req.cookies.Usuario + ' te quedan ' + puntos + ' puntos'
                    }
                    res.cookie(
                        'Puntos',
                        puntos,
                        {signed: true}
                    );
                    res.send({
                        resultado: 'La multiplicaión de ('+numeros.x+'*'+numeros.y+') es igual a = '+ multiplicaion,
                        mensaje: mens
                    });
                } else {
                    console.log('Valores Inválidos')
                    res.send({
                        ERROR: 'Valores Inválidos'
                    });
                }
            } catch (e) {
                console.error('Error', e)
                throw new BadRequestException('Error en la validación de numeros')
            }
        } else {
            console.log('No se a definido ningun Nombre de usuario')
            throw new BadRequestException('No se a definido ningun Nombre de usuario')
        }
    }

    @Post('/division/:x/:y')
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
                const error: ValidationError[] = await validate(numeros)
                if(error.length == 0) {
                    if(numeros.y!=0) {
                        const division = numeros.x / numeros.y
                        let mens = ''
                        let puntos = req.signedCookies.Puntos - Math.abs(division);
                        if(puntos<=0){
                            mens = req.cookies.Usuario + ' haz terminado tus puntos, se te han restablecido de nuevo';
                            puntos = 100;
                        }else{
                            mens = req.cookies.Usuario + ' te quedan ' + puntos + ' puntos'
                        }
                        res.cookie(
                            'Puntos',
                            puntos,
                            {signed: true}
                        );
                        res.send({
                            resultado: 'La división de ('+numeros.x+'/'+numeros.y+') es igual a = '+ division,
                            mensaje: mens
                        });
                    }else{
                        console.log('No existe la divición para cero')
                        res.send({
                            ERROR: 'No existe la divición para cero'
                        });
                    }
                }else{
                    console.log('Valores Inválidos')
                    res.send({
                        ERROR: 'Valores Inválidos'
                    });
                }
            }catch (e) {
                console.log('Error', e)
                throw new BadRequestException('Error en la validación de números')
            }
        }else{
            console.log('No se a definido ningun Nombre de usuario')
            throw new BadRequestException('No se a definido ningun Nombre de usuario')
        }
    }





}