import { PartialType } from '@nestjs/mapped-types';
import { CreatePrecatoryDto } from './create-precatory.dto';
import { IsBoolean, IsDateString, IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { PlataformaDistribuicao } from '@prisma/client';
import { Type } from 'class-transformer';

export class UpdatePrecatoryDto extends PartialType(CreatePrecatoryDto) {
    @IsNumber(undefined, { message: 'O campo `status` deve ser um inteiro.' })
    @IsOptional()
    status?: number;

    @IsString({ message: '`laudo_doenca` deve ser uma string.' })
    @IsOptional()
    laudo_doenca?: string;

    // dados do processo \\
    @IsString({ message: '`numero_processo` deve ser uma string.' })
    @IsOptional()
    numero_processo?: string;

    @IsString({ message: '`vara_juizo` deve ser uma string.' })
    @IsOptional()
    vara_juizo?: string;

    @IsDateString({}, { message: '`data_protocolo` deve ser uma data válida no formato ISO.' })
    @IsOptional()
    data_protocolo?: string;

    @IsEnum(PlataformaDistribuicao, {
        message: '`plataforma_distribuicao` deve ser \'Legal_One\', \'Projudi\', \'PJe\' ou \'Outro\'.',
    })
    @IsOptional()
    plataforma_distribuicao?: PlataformaDistribuicao;
    // FIM dados do processo \\

    // dados da restituição \\

    @Type(() => Number)
    @IsNumber({}, { message: '`valor_simulador_RRA` deve ser um número.' })
    @Min(0, { message: '`valor_simulador_RRA` não pode ser negativo.' })
    @IsOptional()
    valor_simulador_RRA?: number;

    @Type(() => Number)
    @IsNumber({}, { message: '`valor_ir_devido` deve ser um número.' })
    @Min(0, { message: '`valor_ir_devido` não pode ser negativo.' })
    @IsOptional()
    valor_ir_devido?: number;

    @Type(() => Number)
    @IsNumber({}, { message: '`diferenca_IR` deve ser um número.' })
    @Min(0, { message: '`diferenca_IR` não pode ser negativo.' })
    @IsOptional()
    diferenca_IR?: number;

    @Type(() => Number)
    @IsNumber({}, { message: '`valor_corrigido_SELIC` deve ser um número.' })
    @Min(0, { message: '`valor_corrigido_SELIC` não pode ser negativo.' })
    @IsOptional()
    valor_corrigido_SELIC?: number;

    @IsBoolean({
        message: '`necessita_calculo_judicial` deve ser um booleano true ou false.',
    })
    @IsOptional()
    necessita_calculo_judicial?: boolean;

    @IsDateString({}, { message: '`data_calculo` deve ser uma data válida no formato ISO.' })
    @IsOptional()
    data_calculo?: string;
    // FIM dados da restituição \\
}

export class UpdatePrecatoryClientDto {
    @IsString({ message: '`nome` deve ser uma string.' })
    nome: string;

    @IsString({ message: '`cpf` deve ser uma string.' })
    cpf: string;

    @IsDateString({}, { message: '`data_nascimento` deve ser uma data válida no formato ISO.' })
    data_nascimento: string;
}
