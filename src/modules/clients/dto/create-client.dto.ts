import {
    IsString,
    IsNotEmpty,
    IsDateString,
    IsBoolean,
    Matches,
    IsEnum,
} from 'class-validator';
import { Sexo } from 'src/shared/enum';

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

    @IsEnum(Sexo, {
        message: '`sexo` deve ser "Masculino", "Feminino" ou "Outro".',
    })
    sexo: Sexo;

    @IsBoolean({ message: '`doença_grave` deve ser um valor booleano (true ou false).' })
    doenca_grave: boolean;

    @IsString({ message: '`laudo_doenca` deve ser uma string.' })
    @IsNotEmpty({ message: '`laudo_doenca` é obrigatório.' })
    laudo_doenca: string;

    @IsBoolean({ message: '`hipossuficiente` deve ser um valor booleano (true ou false).' })
    hipossuficiente: boolean;
}
