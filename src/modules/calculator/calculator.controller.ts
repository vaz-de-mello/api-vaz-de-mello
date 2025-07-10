import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { CalculatorRRADto } from './dto';
import { Ok } from 'src/shared/responses';

@Controller('calculator')
export class CalculatorController {
    constructor(private readonly calculatorService: CalculatorService) { }

    @HttpCode(200)
    @Post('rra')
    async calculateRRA(
        @Body() body: CalculatorRRADto,
    ) {
        const { numeroMeses, rendimentoTotal, deducoes, ano, mes } = body;
        const data = this.calculatorService.calculateRRA({
            rendimentoTotal,
            numeroMeses,
            deducoes,
            ano,
            mes,
        });

        return new Ok({
            data,
            message: "Cálculo de RRA realizado com sucesso.",
        })
    }
}
