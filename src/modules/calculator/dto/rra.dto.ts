import { IsIn, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Max, Min } from "class-validator";

export class CalculatorRRADto {
    @IsNotEmpty({ message: "O campo `numeroMeses` é obrigatório." })
    @IsInt({ message: "O campo `numeroMeses` deve ser um número inteiro." })
    @IsPositive({ message: "O campo `numeroMeses` deve ser um número positivo." })
    numeroMeses: number;

    @IsNotEmpty({ message: "O campo `deducoes` é obrigatório." })
    @IsInt({ message: "O campo `deducoes` deve ser um número inteiro." })
    deducoes: number;

    @IsNotEmpty({ message: "O campo `rendimentoTotal` é obrigatório." })
    @IsNumber({ allowNaN: false, allowInfinity: false }, { message: "O campo `rendimentoTotal` deve ser um número positivo." })
    @IsPositive({ message: "O campo `rendimentoTotal` deve ser um número positivo." })
    rendimentoTotal: number;

    @IsInt({ message: 'O campo `ano` deve ser um número inteiro.' })
    @Min(2020, { message: 'O campo `ano` mínimo permitido é 2020.' })
    @Max(2025, { message: 'O campo `ano` máximo permitido é 2025.' })
    ano: number;

    @IsNotEmpty({ message: "O campo `mes` é obrigatório." })
    @IsString({ message: "O campo `mes` deve ser uma string." })
    @IsIn(
        ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
        { message: 'O campo `mes` deve ser um destes valores: jan, fev, mar, abr, mai, jun, jul, ago, set, out, nov, dez.' },
    )
    mes: string;
}