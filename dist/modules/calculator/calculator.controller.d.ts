import { CalculatorService } from './calculator.service';
import { Ok } from 'src/shared/responses';
import { CalculatorRRADto } from './dto';
export declare class CalculatorController {
    private readonly calculatorService;
    constructor(calculatorService: CalculatorService);
    calculateRRA(body: CalculatorRRADto): Promise<Ok>;
}
