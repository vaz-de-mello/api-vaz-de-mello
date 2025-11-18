import { PrecatoriesService } from './precatories.service';
import { CalculatorService } from '../calculator/calculator.service';
import { ClientsService } from '../clients/clients.service';
import { Ok } from 'src/shared/responses';
import { PageQueryDto } from 'src/shared/@types';
import { CreatePrecatoryDto, UpdatePrecatoryClientDto, UpdatePrecatoryDto } from './dto';
import { PrecatoryEntity } from './entities';
import { UserWithoutPassword } from '../users/entities';
export declare class PrecatoriesController {
    private readonly precatoriesService;
    private readonly calculatorService;
    private readonly clientsService;
    constructor(precatoriesService: PrecatoriesService, calculatorService: CalculatorService, clientsService: ClientsService);
    create(createPrecatorioDto: CreatePrecatoryDto, user: UserWithoutPassword): Promise<Ok>;
    findAll({ page, query }: PageQueryDto<Partial<PrecatoryEntity>>, user: UserWithoutPassword, status?: string, sort?: string): Promise<Ok>;
    findOne(id: string): Promise<Ok>;
    calculateRRA(id: string): Promise<Ok>;
    findByCardNumber(number: string, user: UserWithoutPassword): Promise<Ok>;
    update(id: string, updatePrecatorioDto: UpdatePrecatoryDto): Promise<Ok>;
    updateClient(id: string, clientId: string, updateClient: UpdatePrecatoryClientDto): Promise<Ok>;
    delete(id: string): Promise<Ok>;
}
