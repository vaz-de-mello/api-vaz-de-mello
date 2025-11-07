import { OfficesService } from './offices.service';
import { Ok } from 'src/shared/responses';
import { PageQueryDto } from 'src/shared/@types';
import { OfficeEntity } from './entities';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/update-office.dto';
export declare class OfficesController {
    private readonly officesService;
    constructor(officesService: OfficesService);
    create(createOfficeDto: CreateOfficeDto): Promise<Ok>;
    findAll({ page, query }: PageQueryDto<Partial<OfficeEntity>>): Promise<Ok>;
    findOne(id: string): Promise<Ok>;
    update(id: string, updateOfficeDto: UpdateOfficeDto): Promise<Ok>;
    delete(id: string): Promise<Ok>;
}
