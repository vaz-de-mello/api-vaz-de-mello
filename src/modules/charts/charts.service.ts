import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ChartsService {
    constructor(
        private readonly db: DatabaseService,
    ) { }

    getTotalRestituition(where?: {
        usuario_id?: string;
        escritorio_id?: string;
    }) {
        return this.db.precatorio.aggregate({
            where,
            _count: {
                id: true,
            },
            _sum: {
                valor_simulador_RRA: true,
                valor_corrigido_SELIC: true,
            },
        })
    }

    getBiggestPrecatories(where?: {
        usuario_id?: string;
        escritorio_id?: string;
    }) {
        return this.db.precatorio.findMany({
            where,
            take: 5,
            orderBy: {
                valor_corrigido_SELIC: 'desc'
            },
            include: {
                cliente: true,
            },
        })
    }

    getTotalByStatus(where?: {
        usuario_id?: string;
        escritorio_id?: string;
    }) {
        return this.db.precatorio.groupBy({
            where,
            by: 'status',
            _count: {
                id: true,
            },
        })
    }

    async getPrecatoriesByYearAndUser({
        officeId,
        userId,
        year,
    }: { year: string; userId?: string; officeId: string }) {
        const result = userId ? await this.db.$queryRaw`
            SELECT
            usuario_id,
            TO_CHAR("createdAt", 'Mon') AS mon,
            SUM("valor_restituicao") AS amount,
            COUNT(*) AS total_rows
            FROM "precatorios"
            WHERE EXTRACT(YEAR FROM "createdAt") = ${+year} AND "usuario_id" = ${userId} AND "escritorio_id" = ${officeId}
            GROUP BY mon, usuario_id
            ORDER BY MIN("createdAt");
        ` : await this.db.$queryRaw`
            SELECT
            TO_CHAR("createdAt", 'Mon') AS mon,
            SUM("valor_restituicao") AS amount,
            COUNT(*) AS total_rows
            FROM "precatorios"
            WHERE EXTRACT(YEAR FROM "createdAt") = ${+year} AND "escritorio_id" = ${officeId}
            GROUP BY mon
            ORDER BY MIN("createdAt");
        `;

        return (result as {
            usuario_id: string;
            mon: string;
            amount: number;
            total_rows: BigInt;
        }[]).map(r => ({
            mon: r.mon.toLowerCase(),
            amount: Number(r.amount),
            total_rows: Number(r.total_rows)
        }));
    }
}
