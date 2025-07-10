import {
    IsString,
    IsNotEmpty,
    Length,
} from 'class-validator';

export class SignUpDto {
    @IsNotEmpty({ message: 'Campo `login` é obrigatório.' })
    @IsString()
    login: string;

    @IsNotEmpty({ message: 'Campo `senha` é obrigatório.' })
    @IsString()
    @Length(8, 100)
    senha: string;
}