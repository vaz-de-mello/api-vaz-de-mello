import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { OfficeEntity } from './entities';
import { PageDto } from 'src/shared/@types';
export declare class OfficesService {
    private readonly db;
    constructor(db: DatabaseService);
    create(createOfficeDto: Prisma.EscritorioCreateArgs): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        nome_fantasia: string;
        telefone: string;
        cnpj: string;
        api_key: string;
        responsaveis_legais: string;
        dominio_white_label: string;
        logo: string;
    }>;
    findAll(query: Partial<OfficeEntity>, page: PageDto): Promise<[number, {
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        nome_fantasia: string;
        telefone: string;
        cnpj: string;
        api_key: string;
        responsaveis_legais: string;
        dominio_white_label: string;
        logo: string;
    }[]]>;
    findUnique(args: Prisma.EscritorioFindUniqueArgs): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        nome_fantasia: string;
        telefone: string;
        cnpj: string;
        api_key: string;
        responsaveis_legais: string;
        dominio_white_label: string;
        logo: string;
    }>;
    findFirst(args: Prisma.EscritorioFindFirstArgs): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        nome_fantasia: string;
        telefone: string;
        cnpj: string;
        api_key: string;
        responsaveis_legais: string;
        dominio_white_label: string;
        logo: string;
    }>;
    findOne(id: string): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        nome_fantasia: string;
        telefone: string;
        cnpj: string;
        api_key: string;
        responsaveis_legais: string;
        dominio_white_label: string;
        logo: string;
    }>;
    update(updateOfficeDto: Prisma.EscritorioUpdateArgs): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        nome_fantasia: string;
        telefone: string;
        cnpj: string;
        api_key: string;
        responsaveis_legais: string;
        dominio_white_label: string;
        logo: string;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
