"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartsService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let ChartsService = class ChartsService {
    constructor(db) {
        this.db = db;
    }
    getTotalRestituition(where) {
        return this.db.precatorio.aggregate({
            where,
            _count: {
                id: true,
            },
            _sum: {
                valor_simulador_RRA: true,
                valor_corrigido_SELIC: true,
            },
        });
    }
    getBiggestPrecatories(where) {
        return this.db.precatorio.findMany({
            where,
            take: 5,
            orderBy: {
                valor_corrigido_SELIC: 'desc'
            },
            include: {
                cliente: true,
            },
        });
    }
    getTotalByStatus(where) {
        return this.db.precatorio.groupBy({
            where,
            by: 'status',
            _count: {
                id: true,
            },
        });
    }
    async getPrecatoriesByYearAndUser({ officeId, userId, year, }) {
        console.log(userId);
        const result = userId ? await this.db.$queryRaw `
            SELECT
            usuario_id,
            TO_CHAR("createdAt", 'Mon') AS mon,
            SUM("valor_restituicao") AS amount,
            COUNT(*) AS total_rows
            FROM "precatorios"
            WHERE EXTRACT(YEAR FROM "createdAt") = ${+year} AND "usuario_id" = ${userId} AND "escritorio_id" = ${officeId}
            GROUP BY mon, usuario_id
            ORDER BY MIN("createdAt");
        ` : await this.db.$queryRaw `
            SELECT
            TO_CHAR("createdAt", 'Mon') AS mon,
            SUM("valor_restituicao") AS amount,
            COUNT(*) AS total_rows
            FROM "precatorios"
            WHERE EXTRACT(YEAR FROM "createdAt") = ${+year} AND "escritorio_id" = ${officeId}
            GROUP BY mon
            ORDER BY MIN("createdAt");
        `;
        return result.map(r => ({
            mon: r.mon.toLowerCase(),
            amount: Number(r.amount),
            total_rows: Number(r.total_rows)
        }));
    }
};
ChartsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ChartsService);
exports.ChartsService = ChartsService;
//# sourceMappingURL=charts.service.js.map