import { TipoDocumento } from '@prisma/client';
import { Type } from 'class-transformer';
import {
    IsUUID,
    IsEnum,
    IsString,
    IsNotEmpty,
    IsBoolean,
} from 'class-validator';

export class CreateDocumentDto {
    @IsUUID(undefined, { message: '`cliente_id` deve ser um UUID válido.' })
    cliente_id: string;

    @IsEnum(TipoDocumento, {
        message: '`tipo_documento` deve ser um tipo válido (RG, CPF, CNH, etc).',
    })
    tipo_documento: TipoDocumento;

    @IsString({ message: '`arquivo` deve ser uma URL ou caminho em string.' })
    @IsNotEmpty({ message: '`arquivo` é obrigatório.' })
    arquivo: string;

    @Type(() => Boolean)
    @IsBoolean({ message: '`assinatura_validada` deve ser verdadeiro ou falso.' })
    assinatura_validada: boolean;
}
