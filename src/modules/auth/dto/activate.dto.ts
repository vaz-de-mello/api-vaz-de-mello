import {
    IsString,
    IsNotEmpty,
    Length,
} from 'class-validator';

export class ActivateDto {
    @IsNotEmpty({ message: 'Campo `login` é obrigatório.' })
    @IsString()
    login: string;

    @IsNotEmpty({ message: 'Campo `senha` é obrigatório.' })
    @IsString()
    @Length(8, 100, { message: 'A senha deve conter pelo menos 8 caracteres.' })
    senha: string;

    @IsNotEmpty({ message: 'Campo `nova senha` é obrigatório.' })
    @IsString()
    @Length(8, 100, { message: 'A senha deve conter pelo menos 8 caracteres.' })
    novaSenha: string;
}