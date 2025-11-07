import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { PageDto } from 'src/shared/@types';
import { PendingsEntity } from './entities';
export declare class PendingsService {
    private readonly db;
    constructor(db: DatabaseService);
    create(createPendingDto: Prisma.PendenciaCreateArgs): Promise<{
        id: string;
        escritorio_id: string;
        createdAt: Date;
        updatedAt: Date;
        status: number;
        precatorio_id: string;
        precatorioaId: string;
        conteudo: Prisma.JsonValue;
        categoria: string;
        responsaveis: string;
        data_final: Date;
    }>;
    findAll(query: Partial<PendingsEntity>, page: PageDto): Promise<[number, {
        id: string;
        escritorio_id: string;
        createdAt: Date;
        updatedAt: Date;
        status: number;
        precatorio_id: string;
        precatorioaId: string;
        conteudo: Prisma.JsonValue;
        categoria: string;
        responsaveis: string;
        data_final: Date;
    }[]]>;
    findByPrecatory(precatorio_id: string): Promise<{
        id: string;
        escritorio_id: string;
        createdAt: Date;
        updatedAt: Date;
        status: number;
        precatorio_id: string;
        precatorioaId: string;
        conteudo: Prisma.JsonValue;
        categoria: string;
        responsaveis: string;
        data_final: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        escritorio_id: string;
        createdAt: Date;
        updatedAt: Date;
        status: number;
        precatorio_id: string;
        precatorioaId: string;
        conteudo: Prisma.JsonValue;
        categoria: string;
        responsaveis: string;
        data_final: Date;
    }>;
    update(updatePendingDto: Prisma.PendenciaUpdateArgs): Promise<{
        id: string;
        escritorio_id: string;
        createdAt: Date;
        updatedAt: Date;
        status: number;
        precatorio_id: string;
        precatorioaId: string;
        conteudo: Prisma.JsonValue;
        categoria: string;
        responsaveis: string;
        data_final: Date;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
