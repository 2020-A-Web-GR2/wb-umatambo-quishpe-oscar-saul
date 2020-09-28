import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    MaxLength, MinLength
} from "class-validator";


export class DepartamentoUpdateDto{

    @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    areaTotal: number;

    @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    precio: number;

    @IsPositive()
    @IsNumber()
    @IsOptional()
    numeroCuartos?: number;

    @IsPositive()
    @IsNumber()
    @IsOptional()
    numeroPiso?: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    @MinLength(10)
    ubicacion: string;
}