import {
    IsNotEmpty,
    IsDivisibleBy,
    IsNumber,
} from "class-validator";

export class NumerosCreateDto{
    @IsNotEmpty()
    @IsNumber()
    x: number;

    @IsNotEmpty()
    @IsNumber()
    y: number;
}