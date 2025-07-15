import { PartialType } from '@nestjs/mapped-types';
import { CreatePrecatoryDto } from './create-precatory.dto';

export class UpdatePrecatoryDto extends PartialType(CreatePrecatoryDto) { }
