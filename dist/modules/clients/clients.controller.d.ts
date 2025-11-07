import { ClientsService } from './clients.service';
import { Ok } from 'src/shared/responses';
import { PageQueryDto } from 'src/shared/@types';
import { ClientEntity } from './entities';
import { CreateClientDto, UpdateClientDto } from './dto';
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    create(createClientDto: CreateClientDto): Promise<Ok>;
    findAll({ page, query }: PageQueryDto<Partial<ClientEntity>>): Promise<Ok>;
    findOne(id: string): Promise<Ok>;
    update(id: string, updateClientDto: UpdateClientDto): Promise<Ok>;
    delete(id: string): Promise<Ok>;
}
