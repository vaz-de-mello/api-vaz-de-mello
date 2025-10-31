import { PartialType } from '@nestjs/mapped-types';
import { CreatePrecatoryDto } from './create-precatory.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdatePrecatoryDto extends PartialType(CreatePrecatoryDto) {
    @IsNumber(undefined, { message: 'O campo `status` deve ser um inteiro.' })
    @IsOptional()
    status?: number;
}
