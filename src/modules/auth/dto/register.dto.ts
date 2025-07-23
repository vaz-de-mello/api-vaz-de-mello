import { IsDateString, IsEmail, IsInt, IsNotEmpty, IsString, isUUID, IsUUID, Length, Matches } from "class-validator";

export class RegisterIndividualDto {
    @IsString({ message: '`nome` deve ser uma string.' })
    @IsNotEmpty({ message: '`nome` é obrigatório.' })
    nome: string;

    @IsString({ message: '`login` deve ser uma string.' })
    @IsNotEmpty({ message: '`login` é obrigatório.' })
    login: string;

    @IsEmail({}, { message: '`email` deve ser um e-mail válido.' })
    email: string;

    @IsString({ message: '`cpf` deve ser uma string.' })
    @Matches(/^\d{11}$/, {
        message: '`cpf` deve conter exatamente 11 dígitos numéricos.',
    })
    cpf: string;

    @IsDateString({}, { message: '`data_nascimento` deve ser uma data válida no formato ISO.' })
    data_nascimento: string;

    @IsString()
    @Length(8, 100)
    senha: string;
}

export class RegisterPartnerDto extends RegisterIndividualDto {
    @IsUUID(undefined, { message: '`escritorio_id` deve ser um UUID válido.' })
    escritorio_id: string;
}