import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { DocumentEntity } from './entities';
import { PageDto } from 'src/shared/@types';
export declare class DocumentsService {
    private readonly db;
    constructor(db: DatabaseService);
    create(createArgs: Prisma.DocumentoCreateArgs): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        cliente_id: string;
        arquivo: string;
        tipo: string;
    }>;
    findAll(query: Partial<DocumentEntity>, page: PageDto): Promise<[number, ({
        cliente: {
            id: string;
            nome: string;
            cpf: string;
            data_nascimento: Date;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        cliente_id: string;
        arquivo: string;
        tipo: string;
    })[]]>;
    findFirst(args: Prisma.DocumentoFindFirstArgs): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        cliente_id: string;
        arquivo: string;
        tipo: string;
    }>;
    findUnique(args: Prisma.DocumentoFindUniqueArgs): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        cliente_id: string;
        arquivo: string;
        tipo: string;
    }>;
    update(updateDocumentArgs: Prisma.DocumentoUpdateArgs): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        cliente_id: string;
        arquivo: string;
        tipo: string;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
