import { PlataformaDistribuicao } from '@prisma/client';
import {
    IsUUID,
    IsString,
    IsNotEmpty,
    IsDateString,
    IsEnum,
} from 'class-validator';

export class CreateProcessDto {
    @IsUUID(undefined, { message: '`cliente_id` deve ser um UUID válido.' })
    cliente_id: string;

    @IsUUID(undefined, { message: '`escritorio_id` deve ser um UUID válido.' })
    escritorio_id: string;

    @IsString({ message: '`numero_processo` deve ser uma string.' })
    @IsNotEmpty({ message: '`numero_processo` é obrigatório.' })
    numero_processo: string;

    @IsString({ message: '`vara_juizo` deve ser uma string.' })
    @IsNotEmpty({ message: '`vara_juizo` é obrigatória.' })
    vara_juizo: string;

    @IsDateString({}, { message: '`data_protocolo` deve ser uma data válida no formato ISO.' })
    data_protocolo: string;

    @IsString({ message: '`documentos_juntados` deve ser uma string.' })
    @IsNotEmpty({ message: '`documentos_juntados` é obrigatório.' })
    documentos_juntados: string;

    @IsEnum(PlataformaDistribuicao, {
        message: '`plataforma_distribuicao` deve ser \'Legal_One\', \'Projudi\', \'PJe\' ou \'Outro\'.',
    })
    plataforma_distribuicao: PlataformaDistribuicao;
}