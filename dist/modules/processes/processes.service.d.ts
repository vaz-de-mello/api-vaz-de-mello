import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { PageDto } from 'src/shared/@types';
import { ProcessEntity } from './entities';
export declare class ProcessesService {
    private readonly db;
    constructor(db: DatabaseService);
    create(createProcessArgs: Prisma.ProcessoCreateArgs): Promise<{
        id: string;
        escritorio_id: string;
        createdAt: Date;
        updatedAt: Date;
        cliente_id: string;
        numero_processo: string;
        vara_juizo: string;
        data_protocolo: Date;
        documentos_juntados: string;
        plataforma_distribuicao: import(".prisma/client").$Enums.PlataformaDistribuicao;
    }>;
    findAll(query: Partial<ProcessEntity>, page: PageDto): Promise<[number, {
        id: string;
        escritorio_id: string;
        createdAt: Date;
        updatedAt: Date;
        cliente_id: string;
        numero_processo: string;
        vara_juizo: string;
        data_protocolo: Date;
        documentos_juntados: string;
        plataforma_distribuicao: import(".prisma/client").$Enums.PlataformaDistribuicao;
    }[]]>;
    findFirst(args: Prisma.ProcessoFindFirstArgs): Promise<{
        id: string;
        escritorio_id: string;
        createdAt: Date;
        updatedAt: Date;
        cliente_id: string;
        numero_processo: string;
        vara_juizo: string;
        data_protocolo: Date;
        documentos_juntados: string;
        plataforma_distribuicao: import(".prisma/client").$Enums.PlataformaDistribuicao;
    }>;
    findUnique(args: Prisma.ProcessoFindUniqueArgs): Promise<{
        id: string;
        escritorio_id: string;
        createdAt: Date;
        updatedAt: Date;
        cliente_id: string;
        numero_processo: string;
        vara_juizo: string;
        data_protocolo: Date;
        documentos_juntados: string;
        plataforma_distribuicao: import(".prisma/client").$Enums.PlataformaDistribuicao;
    }>;
    update(updateProcessArgs: Prisma.ProcessoUpdateArgs): Promise<{
        id: string;
        escritorio_id: string;
        createdAt: Date;
        updatedAt: Date;
        cliente_id: string;
        numero_processo: string;
        vara_juizo: string;
        data_protocolo: Date;
        documentos_juntados: string;
        plataforma_distribuicao: import(".prisma/client").$Enums.PlataformaDistribuicao;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
