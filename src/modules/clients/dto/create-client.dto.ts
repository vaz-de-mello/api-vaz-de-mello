import {
    IsString,
    IsNotEmpty,
    IsDateString,
    IsBoolean,
    Matches,
} from 'class-validator';

export class CreateClientDto {
    @IsString({ message: '`cpf` deve ser uma string.' })
    @Matches(/^\d{11}$/, {
        message: '`cpf` deve conter exatamente 11 dígitos numéricos.',
    })
    cpf: string;

    @IsString({ message: '`nome` deve ser uma string.' })
    @IsNotEmpty({ message: '`nome` é obrigatório.' })
    nome: string;

    @IsDateString({}, { message: '`data_nascimento` deve ser uma data válida no formato ISO.' })
    data_nascimento: string;
}
