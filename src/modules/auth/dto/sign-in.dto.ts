import { IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
    @IsNotEmpty({ message: 'Campo `login` é obrigatório.' })
    @IsString()
    login: string;

    @IsNotEmpty({ message: 'Campo `senha` é obrigatório.' })
    @IsString()
    senha: string;
}