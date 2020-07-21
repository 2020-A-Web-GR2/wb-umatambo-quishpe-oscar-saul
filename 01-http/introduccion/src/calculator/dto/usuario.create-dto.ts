import {
    IsAlpha,
    IsNotEmpty,
    Length,
} from "class-validator";


export class UsuarioCreateDto{
    @IsNotEmpty()
    @IsAlpha()
    @Length(3, 60)
    nombre: string;
}