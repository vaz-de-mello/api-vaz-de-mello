import { PrecatoriesService } from './precatories.service';
import { CalculatorService } from '../calculator/calculator.service';
import { Ok } from 'src/shared/responses';
import { PageQueryDto } from 'src/shared/@types';
import { CreatePrecatoryDto, UpdatePrecatoryDto } from './dto';
import { PrecatoryEntity } from './entities';
import { UserWithoutPassword } from '../users/entities';
export declare class PrecatoriesController {
    private readonly precatoriesService;
    private readonly calculatorService;
    constructor(precatoriesService: PrecatoriesService, calculatorService: CalculatorService);
    create(createPrecatorioDto: CreatePrecatoryDto, user: UserWithoutPassword): Promise<Ok>;
    findAll({ page, query }: PageQueryDto<Partial<PrecatoryEntity>>, user: UserWithoutPassword, status?: string): Promise<Ok>;
    findOne(id: string): Promise<Ok>;
    calculateRRA(id: string): Promise<Ok>;
    update(id: string, updatePrecatorioDto: UpdatePrecatoryDto): Promise<Ok>;
    delete(id: string): Promise<Ok>;
}
