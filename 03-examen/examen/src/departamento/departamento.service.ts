import {Injectable} from "@nestjs/common";
import {FindManyOptions, LessThanOrEqual, Like, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {DepartamentoEntity} from "./departamento.entity";
import {DEFAULT_VERSION} from "@nestjs/schematics/dist";

@Injectable()
export class DepartamentoService{
    constructor(
        @InjectRepository(DepartamentoEntity)
        private repositorio: Repository<DepartamentoEntity>
    ){
    }

    crearUno(nuevoDepartamento: DepartamentoEntity){
        const x: number = 9999;
        if(nuevoDepartamento.numeroCuartos == null){
            nuevoDepartamento.numeroCuartos = x
        }
        if(nuevoDepartamento.numeroPiso == null){
            nuevoDepartamento.numeroPiso = x
        }
        return this.repositorio.save(nuevoDepartamento) //Promesa
    }

    buscarUno(id: number){
        return this.repositorio.findOne(id) //Promesa
    }

    editarUno(departamentoEditado: DepartamentoEntity){
        return this.repositorio.save(departamentoEditado);
    }

    eliminarUno(id: number){
        return this.repositorio.delete(id)
    }

    buscarTodos(textoDeConsulta?: string) {
        var valorNumerico: number;
        if(parseInt(textoDeConsulta)){valorNumerico = parseInt(textoDeConsulta)}
        if(textoDeConsulta !== undefined) {
            if(valorNumerico !== undefined) {
                const consulta: FindManyOptions<DepartamentoEntity> = {
                    where: [
                        {
                            precio: LessThanOrEqual(parseInt(textoDeConsulta))
                        }
                    ]
                }
                return this.repositorio.find(consulta)
            }else{
                const consulta: FindManyOptions<DepartamentoEntity> = {
                    where: [
                        {
                            ubicacion: Like(`%${textoDeConsulta}%`)
                        }
                    ]
                }
                return this.repositorio.find(consulta)
            }
        }else{
            return this.repositorio.find()
        }//Promesa
    }

}