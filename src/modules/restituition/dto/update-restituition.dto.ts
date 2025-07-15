import { PartialType } from '@nestjs/mapped-types';
import { CreateRestituitionDto } from './create-restituition.dto';

export class UpdateRestituitionDto extends PartialType(CreateRestituitionDto) { }
