import {
    BadRequestException,
    Body,
    Controller, Get, InternalServerErrorException, NotFoundException, Param, Post, Query, Res, Session,
} from "@nestjs/common";
import {DepartamentoService} from "./departamento.service";
import {DepartamentoCreateDto} from "./dto/departamento.create-dto";
import {validate, ValidationError} from "class-validator";
import {DepartamentoEntity} from "./departamento.entity";
import {DepartamentoUpdateDto} from "./dto/departamento.update-dto";

@Controller('departamento')
export class DepartamentoController{


    constructor(
        private readonly _departamentoService: DepartamentoService
    ){}

    @Get('inicio')
    async inicio(
        @Res() res,
        @Query() parametrosConsulta,
        @Session() session
    ) {
        const estaLogeado = session.usuario;
        if (estaLogeado) {
            let resultadoConsulta
            try {
                resultadoConsulta = await this._departamentoService.buscarTodos(parametrosConsulta.busqueda);
            } catch (error) {
                throw  new InternalServerErrorException('Error encontrando departamentos')
            }
            if (resultadoConsulta) {
                res.render(
                    'inicio/inicio',
                    {
                        departamentos: resultadoConsulta,
                        parametrosConsulta: parametrosConsulta,
                        usuario: session.usuario,
                        roles: session.roles
                    }
                )
            } else {
                throw new NotFoundException('No se encontraron departamentos')
            }
        }else{
            return res.redirect('/login')
        }
    }

    @Get('crear') // Controlador
    vistaCrearDepartamento(
        @Query() parametrosConsulta,
        @Res() res,
        @Session() session
    ) {
        const estaLogeado = session.usuario;
        if (estaLogeado) {
            return res.render(
                'inicio/crear',
                {
                    error: parametrosConsulta.error,
                    areaTotal: parametrosConsulta.areaTotal,
                    numeroCuartos: parametrosConsulta.numeroCuartos,
                    numeroPiso: parametrosConsulta.numeroPiso,
                    precio: parametrosConsulta.precio,
                    ubicacion: parametrosConsulta.ubicacion,
                    usuario: session.usuario,
                    roles: session.roles
                }
            )
        }else{
            return res.redirect('/login')
        }
    }

    @Post('crear')
    async crearDepartamento(
        @Body() parametrosCuerpo,
        @Res() res
    ) {
        const departamento = new DepartamentoCreateDto()
        departamento.areaTotal = Number(parametrosCuerpo.areaTotal)
        if(parametrosCuerpo.numeroCuartos !== ""){
            departamento.numeroCuartos = Number(parametrosCuerpo.numeroCuartos)
        } else {departamento.numeroCuartos = null }
        if(parametrosCuerpo.numeroPiso !== ""){
            departamento.numeroPiso = Number(parametrosCuerpo.numeroPiso)
        } else {departamento.numeroPiso = null}
        departamento.precio = Number(parametrosCuerpo.precio)
        departamento.ubicacion = parametrosCuerpo.ubicacion
        try {
            const error: ValidationError[] = await validate(departamento)
            if (error.length == 0) {
                let respuestaCreacionDepartamento;
                try {
                    respuestaCreacionDepartamento = await this._departamentoService.crearUno(parametrosCuerpo);
                } catch (error) {
                    console.error(error);
                    const mensajeError = 'CREANDO DEPARTAMENTO 1'
                    return res.redirect('crear?error=' + mensajeError+`&areaTotal=${parametrosCuerpo.areaTotal}&numeroCuartos=${parametrosCuerpo.numeroCuartos}&numeroPiso=${parametrosCuerpo.numeroPiso}&precio=${parametrosCuerpo.precio}&ubicacion=${parametrosCuerpo.ubicacion}`);
                }
                if (respuestaCreacionDepartamento) {
                    return res.redirect('inicio')
                } else {
                    const mensajeError = 'CREANDO DEPARTAMENTO 2'
                    return res.redirect('crear?error=' + mensajeError+`&areaTotal=${parametrosCuerpo.areaTotal}&numeroCuartos=${parametrosCuerpo.numeroCuartos}&numeroPiso=${parametrosCuerpo.numeroPiso}&precio=${parametrosCuerpo.precio}&ubicacion=${parametrosCuerpo.ubicacion}`);
                }
            } else {
                const mensajeError = 'DATOS INVALIDOS'
                return res.redirect('crear?error='+mensajeError+`&areaTotal=${parametrosCuerpo.areaTotal}&numeroCuartos=${parametrosCuerpo.numeroCuartos}&numeroPiso=${parametrosCuerpo.numeroPiso}&precio=${parametrosCuerpo.precio}&ubicacion=${parametrosCuerpo.ubicacion}`);
            }
        } catch (e) {
            console.error(e)
            throw new BadRequestException({
                mensaje: 'Error validando datos'
            });
        }

    }

    @Get('editar/:id')
    async vistaEditarDepartamento(
        @Query() parametrosConsulta,
        @Param() parametrosRuta,
        @Res() res,
        @Session() session
    ) {
        const estaLogeado = session.usuario;
        if (estaLogeado) {
            const id = Number(parametrosRuta.id)
            let departamentoEncontrado;
            try {
                departamentoEncontrado = await this._departamentoService.buscarUno(id);
            }catch(error){
                console.error('Error del servidor');
                return res.redirect('/departamento/inicio?mensaje=Error buscando departamento');
            }
            if(departamentoEncontrado){
                return res.render(
                    'inicio/crear',
                    {
                        error: parametrosConsulta.error,
                        departamento: departamentoEncontrado,
                        usuario: session.usuario,
                        roles: session.roles
                    }
                )
            }else{
                return res.redirect('/departamento/inicio?mensaje=departamento no encontrado')
            }
        }else{
            return res.redirect('/login')
        }
    }

    @Post('editar/:id')
    async editarDepartamento(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() res,
    ) {
        const departamento = new DepartamentoUpdateDto()
        departamento.areaTotal = Number(parametrosCuerpo.areaTotal)
        departamento.numeroCuartos = Number(parametrosCuerpo.numeroCuartos)
        departamento.numeroPiso = Number(parametrosCuerpo.numeroPiso)
        departamento.precio = Number(parametrosCuerpo.precio)
        departamento.ubicacion = parametrosCuerpo.ubicacion
        try {
            const error: ValidationError[] = await validate(departamento)
            if (error.length == 0) {
                const departamentoEditado = {
                    id: Number(parametrosRuta.id),
                    areaTotal: Number(parametrosCuerpo.areaTotal),
                    numeroCuartos: Number(parametrosCuerpo.numeroCuartos),
                    numeroPiso: Number(parametrosCuerpo.numeroPiso),
                    precio: Number(parametrosCuerpo.precio),
                    ubicacion: parametrosCuerpo.ubicacion
                } as DepartamentoEntity
                try {
                    await this._departamentoService.editarUno(departamentoEditado);
                    return res.redirect('/departamento/inicio?mensaje=Departamento editado');
                }catch (error) {
                    console.error(error);
                    return res.redirect('/departamento/inicio?mensaje=Error editando departamento');
                }
            } else {
                const mensajeError = 'DATOS INVALIDOS'
                return res.redirect('/departamento/editar/'+parametrosRuta.id+'?error=' + mensajeError);
            }
        } catch (e) {
            console.error(e)
            throw new BadRequestException({
                mensaje: 'Error validando datos'
            });
        }
    }

    @Post('eliminar/:id')
    async eliminarDepartamento(
        @Param() parametrosRuta,
        @Res() res
    ) {
        try {
            const id = Number(parametrosRuta.id);
            await this._departamentoService.eliminarUno(id);
            return  res.redirect('/departamento/inicio?mensaje=Departamento eliminado')
        } catch (error) {
            console.log(error)
            return res.redirect('/departamento/inicio?eror=Error eliminando departamento')
        }

    }

}