import { Module } from '@nestjs/common';
import { PrecatoriesService } from './precatories.service';
import { PrecatoriesController } from './precatories.controller';
import { CalculatorModule } from '../calculator/calculator.module';
import { ClientsModule } from '../clients/clients.module';

@Module({
    controllers: [PrecatoriesController],
    providers: [PrecatoriesService],
    imports: [CalculatorModule, ClientsModule],
})
export class PrecatoriesModule { }
