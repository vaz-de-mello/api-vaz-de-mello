import { Module } from '@nestjs/common';
import { PrecatoriesService } from './precatories.service';
import { PrecatoriesController } from './precatories.controller';
import { CalculatorModule } from '../calculator/calculator.module';

@Module({
    controllers: [PrecatoriesController],
    providers: [PrecatoriesService],
    imports: [CalculatorModule],
})
export class PrecatoriesModule { }
