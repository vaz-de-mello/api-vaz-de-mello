import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) { }

export class UpdateUserPasswordDto {
    @IsString({ message: '`password` deve ser uma string.' })
    @IsNotEmpty({ message: '`password` é obrigatório.' })
    password: string;
}
