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
exports.RestitutionController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const restituition_service_1 = require("./restituition.service");
const responses_1 = require("../../shared/responses");
const _types_1 = require("../../shared/@types");
const decorators_1 = require("../../shared/decorators");
const utils_1 = require("../../shared/utils");
const dto_1 = require("./dto");
let RestitutionController = class RestitutionController {
    constructor(restituitionService) {
        this.restituitionService = restituitionService;
    }
    async create(createRestitutionDto) {
        const restituition = await this.restituitionService.create({
            data: createRestitutionDto,
        });
        return new responses_1.Ok({
            data: restituition,
            message: 'Restituição criada com sucesso.',
        });
    }
    async findAll({ page, query }) {
        const [total, restituitions] = await this.restituitionService.findAll(query, page);
        const response = (0, utils_1.createPaginatedResponse)({
            data: restituitions,
            total,
            page,
        });
        return new responses_1.Ok(response);
    }
    async findOne(id) {
        const restituition = await this.restituitionService.findUnique({
            where: { id },
            include: { precatorio: true },
        });
        if (!restituition)
            throw new common_1.NotFoundException({
                message: 'Restituição não encontrada.',
                success: false,
                statusCode: 404,
                error: 'NotFound',
            });
        return new responses_1.Ok({
            data: restituition,
            message: 'Restituição encontrada com sucesso.',
        });
    }
    async update(id, updateRestitutionDto) {
        const restituition = await this.restituitionService.update({
            where: { id },
            data: updateRestitutionDto,
        });
        return new responses_1.Ok({
            data: restituition,
            message: 'Restituição atualizada com sucesso.',
        });
    }
    async delete(id) {
        const { message } = await this.restituitionService.delete(id);
        return new responses_1.Ok({
            message,
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateRestituitionDto]),
    __metadata("design:returntype", Promise)
], RestitutionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, decorators_1.PageQuery)({
        equals: ['id', 'tese_aplicada', 'necessita_calculo_judicial', 'status'],
        enumValidator: [
            { key: 'tese_aplicada', enum: client_1.TeseAplicada },
        ]
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_types_1.PageQueryDto]),
    __metadata("design:returntype", Promise)
], RestitutionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RestitutionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateRestituitionDto]),
    __metadata("design:returntype", Promise)
], RestitutionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RestitutionController.prototype, "delete", null);
RestitutionController = __decorate([
    (0, common_1.Controller)('restituition'),
    __metadata("design:paramtypes", [restituition_service_1.RestitutionService])
], RestitutionController);
exports.RestitutionController = RestitutionController;
//# sourceMappingURL=restituition.controller.js.map