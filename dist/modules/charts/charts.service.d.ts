import { DatabaseService } from '../database/database.service';
export declare class ChartsService {
    private readonly db;
    constructor(db: DatabaseService);
    getTotalRestituition(where?: {
        usuario_id?: string;
        escritorio_id?: string;
    }): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Prisma.GetPrecatorioAggregateType<{
        where: {
            usuario_id?: string;
            escritorio_id?: string;
        };
        _count: {
            id: true;
        };
        _sum: {
            valor_simulador_RRA: true;
            valor_corrigido_SELIC: true;
        };
    }>>;
    getBiggestPrecatories(where?: {
        usuario_id?: string;
        escritorio_id?: string;
    }): import(".prisma/client").Prisma.PrismaPromise<({
        cliente: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            cpf: string;
            nome: string;
            data_nascimento: Date;
        };
    } & {
        id: string;
        cliente_id: string;
        data_levantamento: Date;
        valor_bruto: import("@prisma/client/runtime/library").Decimal;
        valor_irrf_retido: import("@prisma/client/runtime/library").Decimal;
        valor_restituicao: import("@prisma/client/runtime/library").Decimal;
        rra_meses: number;
        tribunal_pagador: string;
        tipo_verba: string;
        honorarios_destacados: import(".prisma/client").$Enums.HonorariosDestacados;
        percentual_honorario: import("@prisma/client/runtime/library").Decimal;
        valor_honorario: import("@prisma/client/runtime/library").Decimal;
        processo_origem: string;
        oficio_pdf: string;
        comprovante_pdf: string;
        usuario_id: string;
        escritorio_id: string;
        tese_aplicada: string;
        status: number;
        contador: number;
        createdAt: Date;
        updatedAt: Date;
        numero_card: string;
        precatorio_derivado: string;
        doenca_grave: boolean;
        doenca: string;
        laudo_doenca: string;
        valor_simulador_RRA: import("@prisma/client/runtime/library").Decimal;
        valor_ir_devido: import("@prisma/client/runtime/library").Decimal;
        diferenca_IR: import("@prisma/client/runtime/library").Decimal;
        valor_corrigido_SELIC: import("@prisma/client/runtime/library").Decimal;
        necessita_calculo_judicial: boolean;
        data_base: Date;
        numero_processo: string;
        vara_juizo: string;
        data_protocolo: Date;
        plataforma_distribuicao: import(".prisma/client").$Enums.PlataformaDistribuicao;
    })[]>;
    getTotalByStatus(where?: {
        usuario_id?: string;
        escritorio_id?: string;
    }): import(".prisma/client").Prisma.GetPrecatorioGroupByPayload<{
        where: {
            usuario_id?: string;
            escritorio_id?: string;
        };
        by: "status";
        _count: {
            id: true;
        };
    }>;
    getPrecatoriesByYearAndUser({ officeId, userId, year, }: {
        year: string;
        userId?: string;
        officeId: string;
    }): Promise<{
        mon: string;
        amount: number;
        total_rows: number;
    }[]>;
}
