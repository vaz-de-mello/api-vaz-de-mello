import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { PageDto } from 'src/shared/@types';
import { ClientEntity } from './entities';
export declare class ClientsService {
    private readonly db;
    constructor(db: DatabaseService);
    create(createClientArgs: Prisma.ClienteCreateArgs): Promise<{
        id: string;
        nome: string;
        cpf: string;
        data_nascimento: Date;
        createdAt: Date;
        updatedAt: Date;
        doenca_grave: boolean;
        laudo_doenca: string;
        hipossuficiente: boolean;
        doenca: string;
    }>;
    findAll(query: Partial<ClientEntity>, page: PageDto): Promise<[number, {
        id: string;
        nome: string;
        cpf: string;
        data_nascimento: Date;
        createdAt: Date;
        updatedAt: Date;
        doenca_grave: boolean;
        laudo_doenca: string;
        hipossuficiente: boolean;
        doenca: string;
    }[]]>;
    findUnique(args: Prisma.ClienteFindUniqueArgs): Promise<{
        id: string;
        nome: string;
        cpf: string;
        data_nascimento: Date;
        createdAt: Date;
        updatedAt: Date;
        doenca_grave: boolean;
        laudo_doenca: string;
        hipossuficiente: boolean;
        doenca: string;
    }>;
    update(updateClientArgs: Prisma.ClienteUpdateArgs): Promise<{
        id: string;
        nome: string;
        cpf: string;
        data_nascimento: Date;
        createdAt: Date;
        updatedAt: Date;
        doenca_grave: boolean;
        laudo_doenca: string;
        hipossuficiente: boolean;
        doenca: string;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
