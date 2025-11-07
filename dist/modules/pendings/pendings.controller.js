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
exports.PendingsController = void 0;
const common_1 = require("@nestjs/common");
const pendings_service_1 = require("./pendings.service");
const decorators_1 = require("../../shared/decorators");
const responses_1 = require("../../shared/responses");
const utils_1 = require("../../shared/utils");
const _types_1 = require("../../shared/@types");
const dto_1 = require("./dto");
let PendingsController = class PendingsController {
    constructor(pendingsService) {
        this.pendingsService = pendingsService;
    }
    async create(createPendingDto, user) {
        const pending = await this.pendingsService.create({
            data: Object.assign(Object.assign({}, createPendingDto), { status: 0, escritorio_id: user.escritorio_id })
        });
        return new responses_1.Ok({ data: pending, message: 'Pendência criada com sucesso.' });
    }
    async findAll({ page, query }, user) {
        query.escritorio_id = user.escritorio_id;
        const [total, pendings] = await this.pendingsService.findAll(query, page);
        const response = (0, utils_1.createPaginatedResponse)({
            data: pendings,
            total,
            page,
        });
        return new responses_1.Ok(response);
    }
    async findByPrecatory(id) {
        const data = await this.pendingsService.findByPrecatory(id);
        return new responses_1.Ok({ data, message: 'Pendências encontradas com sucesso.' });
    }
    async findOne(id) {
        const data = await this.pendingsService.findOne(id);
        return new responses_1.Ok({ data, message: 'Pendência encontradas com sucesso.' });
    }
    async update(id, updatePendingDto) {
        const data = await this.pendingsService.update({
            data: updatePendingDto,
            where: { id },
        });
        return new responses_1.Ok({ data, message: 'Pendência atualizada com sucesso.' });
    }
    async remove(id) {
        const { message } = await this.pendingsService.delete(id);
        return new responses_1.Ok({ message });
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreatePendingDto, Object]),
    __metadata("design:returntype", Promise)
], PendingsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, decorators_1.PageQuery)({
        caseSensitive: ['nome_fantasia', 'responsaveis_legais'],
        equals: ['cnpj', 'id'],
    })),
    __param(1, (0, decorators_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_types_1.PageQueryDto, Object]),
    __metadata("design:returntype", Promise)
], PendingsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('precatory/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PendingsController.prototype, "findByPrecatory", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PendingsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdatePendingDto]),
    __metadata("design:returntype", Promise)
], PendingsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PendingsController.prototype, "remove", null);
PendingsController = __decorate([
    (0, common_1.Controller)('pendings'),
    __metadata("design:paramtypes", [pendings_service_1.PendingsService])
], PendingsController);
exports.PendingsController = PendingsController;
