import { IsString, IsUUID, IsInt, IsDateString, Length } from 'class-validator';

export class CreatePendingDto {
    @IsUUID(undefined, { message: 'O campo "precatorio_id" deve ser um UUID válido.' })
    precatorio_id: string;

    @IsString({ message: 'O campo "titulo" deve ser um texto.' })
    @Length(1, 255, { message: 'O campo "titulo" deve ter entre 1 e 255 caracteres.' })
    titulo: string;

    @IsString({ message: 'O campo "categoria" deve ser um texto.' })
    @Length(1, 100, { message: 'O campo "categoria" deve ter entre 1 e 100 caracteres.' })
    categoria: string;

    @IsString({ message: 'O campo "responsáveis" deve ser um texto.' })
    @Length(1, 500, { message: 'O campo "responsáveis" deve ter entre 1 e 500 caracteres.' })
    responsaveis: string;

    @IsDateString({}, { message: 'O campo "data_final" deve ser uma data válida no formato ISO (YYYY-MM-DD).' })
    data_final: string;
}
