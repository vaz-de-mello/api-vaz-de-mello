import { PartialType } from '@nestjs/mapped-types';
import { CreateRestituicaoDto } from './create-restituicao.dto';

export class UpdateRestituicaoDto extends PartialType(CreateRestituicaoDto) {}
