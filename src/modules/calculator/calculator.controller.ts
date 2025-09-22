import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { CalculatorRRADto } from './dto';
import { Ok } from 'src/shared/responses';
import { dateFormatted, selicCalculator } from 'src/shared/utils';
import { Public } from 'src/shared/decorators';
import { MONTHS_NUMBER_SHORT } from 'src/shared/constants';

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

        const mesesDeIsencaoIdoso = this.calculatorService.mesesComMaisDe65(new Date(`${ano}-${MONTHS_NUMBER_SHORT[mes]}-01T00:00:01`), new Date(userBirthDate), numeroMeses);

        const { totalRRA } = this.calculatorService.calculateRRA(mesesDeIsencaoIdoso, {
            rendimentoTotal: rendimentoTotal - deducoes,
            numeroMeses,
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
