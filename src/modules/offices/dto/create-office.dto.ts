import {
    IsString,
    IsNotEmpty,
    IsEmail,
    IsUrl,
    Matches,
} from 'class-validator';

export class CreateOfficeDto {
    @IsString({ message: '`nome_fantasia` deve ser uma string.' })
    @IsNotEmpty({ message: '`nome_fantasia` é obrigatório.' })
    nome_fantasia: string;

    @IsString({ message: '`telefone` deve ser uma string.' })
    @IsNotEmpty({ message: '`telefone` é obrigatório.' })
    @Matches(/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/, {
        message: '`telefone` deve estar no formato (99) 99999-9999',
    })
    telefone: string;

    @IsEmail({}, { message: '`email` inválido.' })
    email: string;

    @IsString({ message: '`cnpj` deve ser uma string.' })
    @IsNotEmpty({ message: '`cnpj` é obrigatório.' })
    @Matches(/^\d{14}$/, {
        message: '`cnpj` deve conter 14 dígitos numéricos',
    })
    cnpj: string;

    @IsString({ message: '`api_key` deve ser uma string.' })
    @IsNotEmpty({ message: '`api_key` é obrigatória.' })
    api_key: string;

    @IsString({ message: '`responsaveis_legais` deve ser uma string.' })
    @IsNotEmpty({ message: '`responsaveis_legais` é obrigatório.' })
    responsaveis_legais: string;

    @IsUrl({}, { message: '`dominio_white_label` deve ser uma URL válida.' })
    dominio_white_label: string;

    @IsUrl({}, { message: '`logo` deve ser uma URL válida.' })
    logo: string;
}