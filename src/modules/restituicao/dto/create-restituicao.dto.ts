import { StatusRestituicao, TeseAplicada } from '@prisma/client';
import { Type } from 'class-transformer';
import {
    IsUUID,
    IsEnum,
    IsNumber,
    IsDateString,
    Min,
    IsBoolean,
} from 'class-validator';

export class CreateRestituicaoDto {
    @IsUUID(undefined, { message: '`precatorio_id` deve ser um UUID válido.' })
    precatorio_id: string;

    @IsEnum(TeseAplicada, {
        message: '`tese_aplicada` deve ser um valor válido da enum TeseAplicada.',
    })
    tese_aplicada: TeseAplicada;

    @Type(() => Number)
    @IsNumber({}, { message: '`valor_simulador_RRA` deve ser um número.' })
    @Min(0, { message: '`valor_simulador_RRA` não pode ser negativo.' })
    valor_simulador_RRA: number;

    @Type(() => Number)
    @IsNumber({}, { message: '`valor_ir_devido` deve ser um número.' })
    @Min(0, { message: '`valor_ir_devido` não pode ser negativo.' })
    valor_ir_devido: number;

    @Type(() => Number)
    @IsNumber({}, { message: '`diferenca_IR` deve ser um número.' })
    @Min(0, { message: '`diferenca_IR` não pode ser negativo.' })
    diferenca_IR: number;

    @Type(() => Number)
    @IsNumber({}, { message: '`valor_corrigido_SELIC` deve ser um número.' })
    @Min(0, { message: '`valor_corrigido_SELIC` não pode ser negativo.' })
    valor_corrigido_SELIC: number;

    @IsBoolean({
        message: '`necessita_calculo_judicial` deve ser um booleano true ou false.',
    })
    necessita_calculo_judicial: boolean;

    @IsDateString({}, { message: '`data_calculo` deve ser uma data válida no formato ISO.' })
    data_calculo: string;

    @IsEnum(StatusRestituicao, {
        message: '`status` deve ser um desses valores: \'em_analise\', \'elegivel\', \'protocolado\', \'indeferido\', \'pago\',.',
    })
    status: StatusRestituicao;
}