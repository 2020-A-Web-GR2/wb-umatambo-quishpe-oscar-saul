import {PrimaryGeneratedColumn, Entity, Column} from "typeorm";

@Entity('departamento')
export class DepartamentoEntity{
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'identificador',
        name: 'id'
    })
    id: number;

    @Column({
        name: 'areaTotal',
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    areaTotal: number;

    @Column({
        name: 'precio',
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    precio: number;

    @Column({
        name: 'numeroCuartos',
        type: 'int',
        nullable: true
    })
    numeroCuartos?: number;

    @Column({
        name: 'numeroPiso',
        type: 'int',
        nullable: true
    })
    numeroPiso?: number;

    @Column({
        name: 'ubicacion',
        type: 'varchar',
        nullable: false
    })
    ubicacion: string;

}