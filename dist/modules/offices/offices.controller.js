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
exports.OfficesController = void 0;
const common_1 = require("@nestjs/common");
const offices_service_1 = require("./offices.service");
const decorators_1 = require("../../shared/decorators");
const utils_1 = require("../../shared/utils");
const responses_1 = require("../../shared/responses");
const enum_1 = require("../../shared/enum");
const _types_1 = require("../../shared/@types");
const create_office_dto_1 = require("./dto/create-office.dto");
const update_office_dto_1 = require("./dto/update-office.dto");
let OfficesController = class OfficesController {
    constructor(officesService) {
        this.officesService = officesService;
    }
    async create(createOfficeDto) {
        const office = await this.officesService.create({ data: createOfficeDto });
        return new responses_1.Ok({ data: office, message: 'Escritório criado com sucesso.' });
    }
    async findAll({ page, query }) {
        const [total, offices] = await this.officesService.findAll(query, page);
        const response = (0, utils_1.createPaginatedResponse)({
            data: offices,
            total,
            page,
        });
        return new responses_1.Ok(response);
    }
    async findOne(id) {
        const office = await this.officesService.findUnique({
            where: { id },
            include: {
                precatorio: true,
                processos: true,
            }
        });
        if (!office)
            throw new common_1.NotFoundException({
                message: 'Escritório não encontrado.',
                success: false,
                statusCode: 404,
                error: 'NotFound',
            });
        return new responses_1.Ok({ data: office, message: 'Escritório encontrado com sucesso.' });
    }
    async update(id, updateOfficeDto) {
        const office = await this.officesService.update({
            where: { id },
            data: updateOfficeDto,
        });
        return new responses_1.Ok({ data: office, message: 'Escritório atualizado com sucesso.' });
    }
    async delete(id) {
        const { message } = await this.officesService.delete(id);
        return new responses_1.Ok({ message });
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_office_dto_1.CreateOfficeDto]),
    __metadata("design:returntype", Promise)
], OfficesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, decorators_1.PageQuery)({
        caseSensitive: ['nome_fantasia', 'responsaveis_legais'],
        equals: ['cnpj', 'id'],
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_types_1.PageQueryDto]),
    __metadata("design:returntype", Promise)
], OfficesController.prototype, "findAll", null);
__decorate([
    (0, decorators_1.Roles)(enum_1.ProfileType.ADMIN, enum_1.ProfileType.ADVOGADO, enum_1.ProfileType.CLIENTE_INDIVIDUAL),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OfficesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_office_dto_1.UpdateOfficeDto]),
    __metadata("design:returntype", Promise)
], OfficesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OfficesController.prototype, "delete", null);
OfficesController = __decorate([
    (0, decorators_1.Roles)(enum_1.ProfileType.ADMIN),
    (0, common_1.Controller)('offices'),
    __metadata("design:paramtypes", [offices_service_1.OfficesService])
], OfficesController);
exports.OfficesController = OfficesController;
//# sourceMappingURL=offices.controller.js.map