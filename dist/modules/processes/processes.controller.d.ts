import { ProcessesService } from './processes.service';
import { Ok } from 'src/shared/responses';
import { PageQueryDto } from 'src/shared/@types';
import { ProcessEntity } from './entities';
import { CreateProcessDto, UpdateProcessDto } from './dto';
export declare class ProcessesController {
    private readonly processesService;
    constructor(processesService: ProcessesService);
    create(createProcessDto: CreateProcessDto): Promise<Ok>;
    findAll({ page, query }: PageQueryDto<Partial<ProcessEntity>>): Promise<Ok>;
    findOne(id: string): Promise<Ok>;
    update(id: string, updateProcessDto: UpdateProcessDto): Promise<Ok>;
    delete(id: string): Promise<Ok>;
}
