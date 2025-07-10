import { Module } from '@nestjs/common';
import { PrecatoriosService } from './precatorios.service';
import { PrecatoriosController } from './precatorios.controller';

@Module({
    controllers: [PrecatoriosController],
    providers: [PrecatoriosService]
})
export class PrecatoriosModule { }
