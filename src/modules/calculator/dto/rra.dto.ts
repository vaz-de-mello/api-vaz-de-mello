import { IsDateString, IsIn, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Max, Min } from "class-validator";

export class CalculatorRRADto {
    @IsNotEmpty({ message: "O campo `Número de Meses (RRA)` é obrigatório." })
    @IsInt({ message: "O campo `Número de Meses` deve ser um número inteiro." })
    @IsPositive({ message: "O campo `Número de Meses` deve ser um número positivo." })
    numeroMeses: number;

    @IsNotEmpty({ message: "O campo `Deduções` é obrigatório." })
    @IsInt({ message: "O campo `Deduções` deve ser um número inteiro." })
    deducoes: number;

    @IsNotEmpty({ message: "O campo `Imposto Retido` é obrigatório." })
    @IsInt({ message: "O campo `Imposto Retido` deve ser um número inteiro." })
    impostoRetido: number;

    @IsNotEmpty({ message: "O campo `Valor principal` é obrigatório." })
    @IsNumber({ allowNaN: false, allowInfinity: false }, { message: "O campo `Valor principal` deve ser um número positivo." })
    @IsPositive({ message: "O campo `Valor principal` deve ser um número positivo." })
    rendimentoTotal: number;

    @IsInt({ message: 'O campo `Ano` deve ser um número inteiro.' })
    @Min(2020, { message: 'O campo `Ano` mínimo permitido é 2020.' })
    @Max(2025, { message: 'O campo `Ano` máximo permitido é 2025.' })
    ano: number;

    @IsNotEmpty({ message: "O campo `Mês` é obrigatório." })
    @IsString({ message: "O campo `Mês` deve ser uma string." })
    @IsIn(
        ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
        { message: 'O campo `Mês` deve ser um destes valores: jan, fev, mar, abr, mai, jun, jul, ago, set, out, nov, dez.' },
    )
    mes: string;

    @IsDateString(undefined, { message: "O campo `Data de Começo da Selic` deve ser uma data." })
    selicStartDate: Date;

    @IsDateString(undefined, { message: "O campo `Data de Término da Selic` deve ser uma data." })
    selicEndDate: Date;

    @IsDateString(undefined, { message: "O campo `Data de Nascimento` deve ser uma data." })
    userBirthDate: Date;
}