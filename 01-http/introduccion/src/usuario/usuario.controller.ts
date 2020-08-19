import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    BadRequestException,
    InternalServerErrorException, NotFoundException, Res
} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {validate, ValidationError} from "class-validator";
import {UsuarioCreateDto} from "./dto/usuario.create-dto";
import {UsuarioUpdateDto} from "./dto/usuario.update-dto";

@Controller('usuario')
export class UsuarioController{

    public arregloUsuarios = [
        {
            id: 1,
            nombre: 'Oscar'
        },
        {
            id: 2,
            nombre: 'Anderson'
        },
        {
            id: 3,
            nombre: 'Nicolas'
        }
    ]

    public idActual = 3;

    constructor(
        private readonly _usuarioService: UsuarioService
    ){

    }

    @Get()
    async mostrarTodos(){
        try{
            const respuesta = await this._usuarioService.buscarTodos();
            return respuesta;
        }catch (e){
            console.error(e)
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor'
            })
        }


        // return this.arregloUsuarios
    }

    @Post()
    async crearUno(
        @Body() parametrosCuerpo
    ) {
        const usuario = new UsuarioCreateDto()
        usuario.nombre = parametrosCuerpo.nombre
        usuario.apellido = parametrosCuerpo.apellido
        usuario.cedula = parametrosCuerpo.cedula
        usuario.sueldo = parametrosCuerpo.sueldo
        usuario.fechaNacimiento = parametrosCuerpo.fechaNacimiento
        usuario.fechaHoraNacimiento = parametrosCuerpo.fechaHoraNacimiento
        try{
            const error: ValidationError[] = await  validate(usuario)
            if(error.length == 0) {
                const respuesta = await this._usuarioService.crearUno(parametrosCuerpo);
                return respuesta
            }else{
                console.log('Valores Inválidos')
                return 'Datos Inválidos'
            }
        }catch (e) {
            console.error(e)
            throw new BadRequestException( {
                mensaje: 'Error validando datos'
            });
        }

        // const  nuevoUsuario = {
        //     id: this.idActual + 1,
        //     nombre: parametrosCuerpo.nombre
        // };
        // this.arregloUsuarios.push(nuevoUsuario)
        // this.idActual = this.idActual + 1;
        // return nuevoUsuario;
    }

    @Get(':id')
    async verUno(
        @Param() parametrosRuta
    ) {
        let respuesta;
        try{
            const respuesta = await this._usuarioService.buscarUno(Number(parametrosRuta.id));
        }catch (e){
            console.error(e)
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor'
            })
        }
        if (respuesta){
            return respuesta;
        } else {
            throw new NotFoundException({
                mensaje: 'No existen registros'
            })
        }

        // const indice = this.arregloUsuarios.findIndex(
        //     (usuario) => usuario.id === Number(parametrosRuta.id)
        // )
        // return this.arregloUsuarios[indice];
    }

    @Put(':id')
    async editarUno(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo
    ){
        const usuario = new UsuarioUpdateDto()
        usuario.nombre = parametrosCuerpo.nombre
        usuario.apellido = parametrosCuerpo.apellido
        usuario.cedula = parametrosCuerpo.cedula
        usuario.sueldo = parametrosCuerpo.sueldo
        usuario.fechaNacimiento = parametrosCuerpo.fechaNacimiento
        usuario.fechaHoraNacimiento = parametrosCuerpo.fechaHoraNacimiento
        const id = Number(parametrosRuta.id);
        const usuarioEditado = parametrosCuerpo;
        usuarioEditado.id = id;
        try{
            const error: ValidationError[] = await  validate(usuario)
            if(error.length == 0) {
                console.log('usuarioEditado', usuarioEditado)
                const respuesta = await this._usuarioService.editarUno(parametrosCuerpo);
                return respuesta
            }else{
                console.log('Valores Inválidos')
                return 'Datos Inválidos'
            }
        }catch (e) {
            console.error(e)
            throw new BadRequestException( {
                mensaje: 'Error validando datos'
            });
        }

        // const indice = this.arregloUsuarios.findIndex(
        //     (usuario) => usuario.id === Number(parametrosRuta.id)
        // );
        // this.arregloUsuarios[indice].nombre = parametrosCuerpo.nombre;
        // return this.arregloUsuarios[indice];
    }

    @Delete(':id')
    async eliminarUno(
        @Param() parametrosRuta
    ){
        const id = Number(parametrosRuta.id);
        try{
            const respuesta = await this._usuarioService.eliminarUno(parametrosRuta);
            return {
                mensaje: 'Registro con id = ' + id + ' eliminado'
            }
        }catch (e) {
            console.error(e)
            throw new BadRequestException( {
                mensaje: 'Error validando datos'
            });
        }

        // const indice = this.arregloUsuarios.findIndex(
        //     (usuario) => usuario.id === Number(parametrosRuta.id)
        // );
        // this.arregloUsuarios.splice(indice,1)
        // return this.arregloUsuarios[indice];
    }

// Usuarrio tiene muchas mascotas
// Mascota tiene muchas vacunas


}