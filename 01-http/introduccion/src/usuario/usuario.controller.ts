import {Controller, Get, Post, Body, Param} from "@nestjs/common";

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

    @Get()
    mostrarTodos(){
        return this.arregloUsuarios
    }

    @Post()
    crearUno(
        @Body() parametrosCuerpo
    ) {
        const  nuevoUsuario = {
            id: this.idActual + 1,
            nombre: parametrosCuerpo.nombre
        };
        this.arregloUsuarios.push(nuevoUsuario)
        this.idActual = this.idActual + 1;
        return nuevoUsuario;
    }

    @Get(':id')
    verUno(
        @Param() parametrosRuta
    ) {
        const indice = this.arregloUsuarios.findIndex(
            (ususraio) => ususraio.id === Number(parametrosRuta.id)
        )
        return this.arregloUsuarios[indice];
    }


}