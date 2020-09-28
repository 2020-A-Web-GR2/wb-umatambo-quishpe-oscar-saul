import {Injectable} from "@nestjs/common";
import {FindManyOptions, Like, Repository} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UsuarioService{
    constructor(
        @InjectRepository(UsuarioEntity)
        private repositorio: Repository<UsuarioEntity>
    ){
    }

    crearUno(nuevoUsuario: UsuarioEntity){
        return this.repositorio.save(nuevoUsuario) //Promesa
    }

    buscarTodos(textoDeConsulta?: string) {
        // let busquedaEjemplo: FindManyOptions<UsuarioEntity>
        // // buscar y relacionar
        // busquedaEjemplo = {
        //     relations: ['mascotas','mascotas.vacunas']
        // }
        // // buscar where
        // busquedaEjemplo = {
        //     where : {
        //         nombre: 'Oscar', // Busqueda exacta AND
        //         apellido: 'Umatambo' // Busque exacta
        //     }
        // }
        // // buscar where
        // busquedaEjemplo = {
        //     order: {
        //         nombre: 'ASC', // ASCENDENTE
        //         id: 'DESC' //DESCENDENTE
        //     }
        // }
        // // buscar paginacion
        // busquedaEjemplo = {
        //     skip: 10,
        //     take: 10
        // }
        // // Busqueda Where Or
        // busquedaEjemplo = {
        //     where : [
        //         {
        //             nombre: 'Oscar'
        //         }, //OR
        //         {
        //             apellido: 'Oscar'
        //         }
        //     ]
        // }
        // busquedaEjemplo = {
        //     where : [
        //         {
        //             nombre: 'Oscar',
        //             apellido: 'Umatambo'
        //         }, //OR
        //         {
        //             nombre: 'Umatambo',
        //             apellido: 'Oscar',
        //         }
        //     ]
        // }
        if(textoDeConsulta !== undefined) {
            const consulta: FindManyOptions<UsuarioEntity> = {
                where: [
                    {
                        nombre: Like(`%${textoDeConsulta}%`)
                    },
                    {
                        apellido: Like(`%${textoDeConsulta}%`)
                    },
                    {
                        cedula: Like(`%${textoDeConsulta}%`)
                    },
                ]
            }
            return this.repositorio.find(consulta) //Promesa
        }else{
            return this.repositorio.find()
        }
    }

    buscarUno(id: number){
        return this.repositorio.findOne(id) //Promesa
    }

    editarUno(usuarioEditado: UsuarioEntity){
        return this.repositorio.save(usuarioEditado);
    }

    eliminarUno(id: number){
        return this.repositorio.delete(id)
    }

}