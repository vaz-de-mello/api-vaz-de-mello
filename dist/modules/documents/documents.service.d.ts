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
        tipo_documento: import(".prisma/client").$Enums.TipoDocumento;
        arquivo: string;
        assinatura_validada: boolean;
    }>;
    findAll(query: Partial<DocumentEntity>, page: PageDto): Promise<[number, ({
        cliente: {
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
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        cliente_id: string;
        tipo_documento: import(".prisma/client").$Enums.TipoDocumento;
        arquivo: string;
        assinatura_validada: boolean;
    })[]]>;
    findFirst(args: Prisma.DocumentoFindFirstArgs): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        cliente_id: string;
        tipo_documento: import(".prisma/client").$Enums.TipoDocumento;
        arquivo: string;
        assinatura_validada: boolean;
    }>;
    findUnique(args: Prisma.DocumentoFindUniqueArgs): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        cliente_id: string;
        tipo_documento: import(".prisma/client").$Enums.TipoDocumento;
        arquivo: string;
        assinatura_validada: boolean;
    }>;
    update(updateDocumentArgs: Prisma.DocumentoUpdateArgs): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        cliente_id: string;
        tipo_documento: import(".prisma/client").$Enums.TipoDocumento;
        arquivo: string;
        assinatura_validada: boolean;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
