import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";

@Index([
    'nombre',
    'apellido',
    'cedula',
    'fechaNacimiento' //Nombres de las propiedades en las clases
])

@Index(
    ['nombre', 'apellido', 'cedula'],
    {unique: true}
)

@Entity('db_usuario')
export class UsuarioEntity{
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'identificador',
        name: 'id'
    })
    id: number;

    @Column({
        name: 'nombre',
        type: 'varchar',
        nullable: true,
        length: '18'
    })
    nombre?: string;

    @Column({
        name: 'apellido',
        type: 'varchar',
        nullable: true,
        length: '18'
    })
    apellido?: string;

    @Column({
        name: 'cedula',
        type: 'varchar',
        nullable: false,
        unique: true,
        length: '10'
    })
    cedula: string;

    @Column({
        nullable: true,
        type: 'decimal',
        precision: 10,
        scale: 4
    })
    sueldo?: number;

    @Column({
        nullable: true,
        type: 'date',
        name: 'fecha_nacimiento'
    })
    fechaNacimiento?: string;

    @Column({
        nullable: true,
        type: 'datetime',
        name: 'fecha_nacimiento_hora'
    })
    fechaHoraNacimiento?: string;
}