
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

    @IsString({ message: 'O campo `tipo_documento` deve ser uma string.' })
    tipo: string;

    @IsString({ message: '`arquivo` deve ser uma URL ou caminho em string.' })
    @IsNotEmpty({ message: '`arquivo` é obrigatório.' })
    arquivo: string;
}
