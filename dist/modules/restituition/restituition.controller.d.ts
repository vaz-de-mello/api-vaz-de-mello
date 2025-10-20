import { RestitutionService } from './restituition.service';
import { Ok } from 'src/shared/responses';
import { PageQueryDto } from 'src/shared/@types';
import { UpdateRestituitionDto, CreateRestituitionDto } from './dto';
import { RestituitionEntity } from './entities';
export declare class RestitutionController {
    private readonly restituitionService;
    constructor(restituitionService: RestitutionService);
    create(createRestitutionDto: CreateRestituitionDto): Promise<Ok>;
    findAll({ page, query }: PageQueryDto<Partial<RestituitionEntity>>): Promise<Ok>;
    findOne(id: string): Promise<Ok>;
    update(id: string, updateRestitutionDto: UpdateRestituitionDto): Promise<Ok>;
    delete(id: string): Promise<Ok>;
}
