import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { CalculatorRRADto } from './dto';
import { Ok } from 'src/shared/responses';
import { dateFormatted, selicCalculator } from 'src/shared/utils';
import { Public } from 'src/shared/decorators';

@Controller('calculator')
export class CalculatorController {
    constructor(private readonly calculatorService: CalculatorService) { }

    @Public()
    @HttpCode(200)
    @Post('rra')
    async calculateRRA(
        @Body() body: CalculatorRRADto,
    ) {
        const {
            numeroMeses,
            rendimentoTotal,
            deducoes,
            ano,
            mes,
            selicEndDate,
            selicStartDate,
            userBirthDate,
        } = body;

        const { isencao, tributavel } = this.calculatorService.calcularIsencao65Anos(userBirthDate, ano, rendimentoTotal);
        console.log({ isencao, tributavel });

        const { totalRRA } = this.calculatorService.calculateRRA({
            rendimentoTotal: +tributavel,
            numeroMeses,
            deducoes,
            ano,
            mes,
        });

        const irSelicFixed = await selicCalculator({
            endDate: dateFormatted(selicEndDate),
            startDate: dateFormatted(selicStartDate),
            value: totalRRA,
        })

        return new Ok({
            data: { totalRRA, irSelicFixed },
            message: "Cálculo de RRA realizado com sucesso.",
        })
    }
}
