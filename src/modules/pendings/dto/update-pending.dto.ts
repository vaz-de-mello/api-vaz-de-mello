import { PartialType } from '@nestjs/mapped-types';
import { CreatePendingDto } from './create-pending.dto';

export class UpdatePendingDto extends PartialType(CreatePendingDto) {}
