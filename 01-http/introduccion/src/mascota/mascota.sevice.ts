import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {MascotaEntity} from "./mascota.entity";
import {Repository} from "typeorm";

@Injectable()
export class  MascotaSevice {
    constructor(
        @InjectRepository(MascotaEntity)
        private repositorio: Repository<MascotaEntity>
    ) {
    }

    crearNuevaMascota(mascota: MascotaEntity){
        return this.repositorio.save(mascota);
    }

}