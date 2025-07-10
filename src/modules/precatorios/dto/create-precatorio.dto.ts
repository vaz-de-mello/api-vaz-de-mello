import { HonorariosDestacados, TipoVerba } from '@prisma/client';
import {
    IsUUID,
    IsString,
    IsNotEmpty,
    IsDateString,
    IsNumber,
    IsPositive,
    IsInt,
    Min,
    Max,
    IsEnum,
    IsUrl,
} from 'class-validator';

export class CreatePrecatorioDto {
    @IsUUID(undefined, { message: '`cliente_id` deve ser um UUID válido.' })
    @IsNotEmpty({ message: '`cliente_id` é obrigatório.' })
    cliente_id: string;

    @IsDateString({}, { message: '`data_levantamento` deve ser uma data válida no formato ISO.' })
    data_levantamento: string;

    @IsNumber({}, { message: '`valor_bruto` deve ser um número.' })
    @IsPositive({ message: '`valor_bruto` deve ser positivo.' })
    valor_bruto: number;

    @IsNumber({}, { message: '`valor_irrf_retido` deve ser um número.' })
    @Min(0, { message: '`valor_irrf_retido` não pode ser negativo.' })
    valor_irrf_retido: number;

    @IsInt({ message: '`rra_meses` deve ser um número inteiro.' })
    @Min(1, { message: '`rra_meses` deve ser no mínimo 1.' })
    rra_meses: number;

    @IsString({ message: '`tribunal_pagador` deve ser uma string.' })
    @IsNotEmpty({ message: '`tribunal_pagador` é obrigatório.' })
    tribunal_pagador: string;

    @IsEnum(TipoVerba, { message: '`tipo_verba` deve ser ALIMENTAR ou INDENIZATORIA.' })
    tipo_verba: TipoVerba;

    @IsEnum(HonorariosDestacados, { message: '`honorarios_destacados` deve ser SIM ou NAO.' })
    honorarios_destacados: HonorariosDestacados;

    @IsNumber({}, { message: '`percentual_honorario` deve ser um número.' })
    @Min(0, { message: '`percentual_honorario` não pode ser negativo.' })
    percentual_honorario: number;

    @IsNumber({}, { message: '`valor_honorario` deve ser um número.' })
    @Min(0, { message: '`valor_honorario` não pode ser negativo.' })
    valor_honorario: number;

    @IsString({ message: '`processo_origem` deve ser uma string.' })
    @IsNotEmpty({ message: '`processo_origem` é obrigatório.' })
    processo_origem: string;

    @IsUrl({}, { message: '`oficio_pdf` deve ser uma URL válida.' })
    oficio_pdf: string;

    @IsUrl({}, { message: '`comprovante_pdf` deve ser uma URL válida.' })
    comprovante_pdf: string;
}