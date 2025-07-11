import { Module } from '@nestjs/common';
import { PrecatoriosService } from './precatorios.service';
import { PrecatoriosController } from './precatorios.controller';
import { CalculatorModule } from '../calculator/calculator.module';

@Module({
    controllers: [PrecatoriosController],
    providers: [PrecatoriosService],
    imports: [CalculatorModule],
})
export class PrecatoriosModule { }
