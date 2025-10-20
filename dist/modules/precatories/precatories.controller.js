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
exports.PrecatoriesController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const precatories_service_1 = require("./precatories.service");
const calculator_service_1 = require("../calculator/calculator.service");
const responses_1 = require("../../shared/responses");
const decorators_1 = require("../../shared/decorators");
const _types_1 = require("../../shared/@types");
const utils_1 = require("../../shared/utils");
const constants_1 = require("../../shared/constants");
const dto_1 = require("./dto");
let PrecatoriesController = class PrecatoriesController {
    constructor(precatoriesService, calculatorService) {
        this.precatoriesService = precatoriesService;
        this.calculatorService = calculatorService;
    }
    async create(createPrecatorioDto, user) {
        const precatory = await this.precatoriesService.create({
            data: Object.assign(Object.assign({}, createPrecatorioDto), { status: 1, usuario_id: user.id, escritorio_id: user.escritorio_id }),
        });
        return new responses_1.Ok({ data: precatory, message: 'Precatório criado com sucesso.' });
    }
    async findAll({ page, query }, user, status) {
        if (status)
            query.status = +status;
        if (user.tipo_perfil_id !== 1)
            query.escritorio_id = user.escritorio_id;
        const [total, preactories] = await this.precatoriesService.findAll(query, page);
        const response = (0, utils_1.createPaginatedResponse)({
            data: preactories,
            total,
            page,
        });
        return new responses_1.Ok(response);
    }
    async findOne(id) {
        const precatory = await this.precatoriesService.findUnique({
            where: { id },
            include: {
                cliente: true,
                escritorio: true,
                usuario: true,
            },
        });
        if (!precatory)
            throw new common_1.NotFoundException({
                message: 'Precatório não encontrado.',
                success: false,
                statusCode: 404,
                error: 'NotFound',
            });
        return new responses_1.Ok({ data: precatory, message: 'Precatório encontrado com sucesso.' });
    }
    async calculateRRA(id) {
        const precatory = await this.precatoriesService.findUnique({ where: { id } });
        if (!precatory)
            throw new common_1.NotFoundException({
                message: 'Precatório não encontrado.',
                success: false,
                statusCode: 404,
                error: 'NotFound',
            });
        const year = precatory.data_levantamento.getFullYear();
        const month = precatory.data_levantamento.getMonth() + 1;
        const { totalRRA } = this.calculatorService.calculateRRA(0, {
            ano: year,
            mes: constants_1.MONTHS_STRING_SHORT[month],
            numeroMeses: precatory.rra_meses,
            rendimentoTotal: +precatory.valor_bruto
        });
        const irSelicFixed = await (0, utils_1.selicCalculator)({
            endDate: (0, utils_1.dateFormatted)(),
            startDate: (0, utils_1.dateFormatted)(precatory.data_levantamento),
            value: totalRRA,
        });
        return new responses_1.Ok({
            data: {
                irSelicFixed,
                totalRRA,
                precatorio: precatory,
            },
            message: 'Cálculo de RRA realizado com sucesso.',
        });
    }
    async update(id, updatePrecatorioDto) {
        const precatory = await this.precatoriesService.update({
            where: { id },
            data: updatePrecatorioDto,
        });
        return new responses_1.Ok({ data: precatory, message: 'Precatório atualizado com sucesso.' });
    }
    async delete(id) {
        const { message } = await this.precatoriesService.delete(id);
        return new responses_1.Ok({ message });
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreatePrecatoryDto, Object]),
    __metadata("design:returntype", Promise)
], PrecatoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, decorators_1.PageQuery)({
        caseSensitive: ['tribunal_pagador'],
        equals: ['id', 'escritorio_id', 'usuario_id', 'cliente_id'],
        enumValidator: [
            { key: 'tipo_verba', enum: client_1.TipoVerba },
            { key: 'honorarios_destacados', enum: client_1.HonorariosDestacados },
        ],
        excludes: ['status']
    })),
    __param(1, (0, decorators_1.User)()),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_types_1.PageQueryDto, Object, String]),
    __metadata("design:returntype", Promise)
], PrecatoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PrecatoriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('rra-calculator/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PrecatoriesController.prototype, "calculateRRA", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdatePrecatoryDto]),
    __metadata("design:returntype", Promise)
], PrecatoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PrecatoriesController.prototype, "delete", null);
PrecatoriesController = __decorate([
    (0, common_1.Controller)('precatories'),
    __metadata("design:paramtypes", [precatories_service_1.PrecatoriesService,
        calculator_service_1.CalculatorService])
], PrecatoriesController);
exports.PrecatoriesController = PrecatoriesController;
//# sourceMappingURL=precatories.controller.js.map