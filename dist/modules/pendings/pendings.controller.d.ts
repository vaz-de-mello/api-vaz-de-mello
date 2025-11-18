import { PendingsService } from './pendings.service';
import { Ok } from 'src/shared/responses';
import { PageQueryDto } from 'src/shared/@types';
import { PendingsEntity } from './entities';
import { UserWithoutPassword } from '../users/entities';
import { CreatePendingDto, UpdatePendingDto } from './dto';
export declare class PendingsController {
    private readonly pendingsService;
    constructor(pendingsService: PendingsService);
    create(createPendingDto: CreatePendingDto, user: UserWithoutPassword): Promise<Ok>;
    findAll({ page, query }: PageQueryDto<Partial<PendingsEntity>>, user: UserWithoutPassword): Promise<Ok>;
    findByPrecatory(id: string): Promise<Ok>;
    findOne(id: string): Promise<Ok>;
    update(id: string, updatePendingDto: UpdatePendingDto): Promise<Ok>;
    remove(id: string): Promise<Ok>;
}
