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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartsController = void 0;
const common_1 = require("@nestjs/common");
const charts_service_1 = require("./charts.service");
const decorators_1 = require("../../shared/decorators");
const enum_1 = require("../../shared/enum");
const responses_1 = require("../../shared/responses");
let ChartsController = class ChartsController {
    constructor(chartsService) {
        this.chartsService = chartsService;
    }
    async getCharts({ id, tipo_perfil_id }, officeId) {
        const where = tipo_perfil_id === 1
            ? { escritorio_id: officeId }
            : { usuario_id: id };
        const [biggestPrecatories, totalRestituition, getTotalByStatus] = await Promise.all([
            this.chartsService.getBiggestPrecatories(where),
            this.chartsService.getTotalRestituition(where),
            this.chartsService.getTotalByStatus(where),
        ]);
        const totalByStatusObj = {
            1: { count: 0 },
            2: { count: 0 },
            3: { count: 0 },
            4: { count: 0 },
            5: { count: 0 },
            6: { count: 0 },
        };
        getTotalByStatus.forEach(({ status, _count }) => totalByStatusObj[status].count = _count.id);
        const data = {
            biggestPrecatories,
            totalRestituition,
            getTotalByStatus: totalByStatusObj,
        };
        return new responses_1.Ok({ data, message: 'Resultados encontrados para o seu gráfico.' });
    }
    async getBiggest(year, officeId, { id, tipo_perfil_id }) {
        const query = tipo_perfil_id === 1
            ? { officeId, year }
            : { officeId, year, userId: id, };
        const data = await this.chartsService.getPrecatoriesByYearAndUser(query);
        const totalByStatusObj = {
            'jan': { value: 0, total_rows: 0 },
            'feb': { value: 0, total_rows: 0 },
            'mar': { value: 0, total_rows: 0 },
            'apr': { value: 0, total_rows: 0 },
            'may': { value: 0, total_rows: 0 },
            'jun': { value: 0, total_rows: 0 },
            'jul': { value: 0, total_rows: 0 },
            'aug': { value: 0, total_rows: 0 },
            'sep': { value: 0, total_rows: 0 },
            'oct': { value: 0, total_rows: 0 },
            'nov': { value: 0, total_rows: 0 },
            'dec': { value: 0, total_rows: 0 },
        };
        data.forEach(({ amount, mon, total_rows }) => {
            totalByStatusObj[mon].value = amount;
            if (amount > 0)
                totalByStatusObj[mon].total_rows = total_rows;
        });
        return new responses_1.Ok({ data: totalByStatusObj, message: `Resultados para o ano de ${year}` });
    }
};
__decorate([
    (0, common_1.Get)('/:officeId'),
    __param(0, (0, decorators_1.User)()),
    __param(1, (0, common_1.Param)('officeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ChartsController.prototype, "getCharts", null);
__decorate([
    (0, common_1.Get)('biggest/:officeId/:year'),
    __param(0, (0, common_1.Param)('year')),
    __param(1, (0, common_1.Param)('officeId')),
    __param(2, (0, decorators_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ChartsController.prototype, "getBiggest", null);
ChartsController = __decorate([
    (0, decorators_1.Roles)(enum_1.ProfileType.ADMIN, enum_1.ProfileType.BROKER),
    (0, common_1.Controller)('charts'),
    __metadata("design:paramtypes", [charts_service_1.ChartsService])
], ChartsController);
exports.ChartsController = ChartsController;
//# sourceMappingURL=charts.controller.js.map