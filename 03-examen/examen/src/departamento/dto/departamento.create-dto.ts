import {
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    MaxLength, MinLength
} from "class-validator";


export class DepartamentoCreateDto {

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    areaTotal: number;


    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    precio: number;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    numeroCuartos?: number;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    numeroPiso?: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    @MaxLength(50)
    ubicacion: string;
}