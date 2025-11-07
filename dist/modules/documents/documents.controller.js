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
exports.DocumentsController = void 0;
const common_1 = require("@nestjs/common");
const documents_service_1 = require("./documents.service");
const responses_1 = require("../../shared/responses");
const _types_1 = require("../../shared/@types");
const decorators_1 = require("../../shared/decorators");
const utils_1 = require("../../shared/utils");
const dto_1 = require("./dto");
let DocumentsController = class DocumentsController {
    constructor(documentsService) {
        this.documentsService = documentsService;
    }
    async create(createDocumentDto) {
        const document = await this.documentsService.create({
            data: createDocumentDto,
        });
        return new responses_1.Ok({
            data: document,
            message: 'Documento criado com sucesso.',
        });
    }
    async findAll({ page, query, rawQuery }) {
        if (rawQuery.assinatura_validada)
            query.assinatura_validada = String(rawQuery.assinatura_validada) === 'true';
        const [total, documents] = await this.documentsService.findAll(query, page);
        const response = (0, utils_1.createPaginatedResponse)({
            data: documents,
            total,
            page,
        });
        return new responses_1.Ok(response);
    }
    async findOne(id) {
        const document = await this.documentsService.findUnique({
            where: { id },
            include: { cliente: true },
        });
        if (!document)
            throw new common_1.NotFoundException({
                message: 'Documento não encontrado.',
                success: false,
                statusCode: 404,
                error: 'NotFound',
            });
        return new responses_1.Ok({
            data: document,
            message: 'Documento encontrado com sucesso.',
        });
    }
    async update(id, updateDocumentDto) {
        const document = await this.documentsService.update({
            where: { id },
            data: updateDocumentDto,
        });
        return new responses_1.Ok({
            data: document,
            message: 'Documento atualizado com sucesso.',
        });
    }
    async delete(id) {
        const { message } = await this.documentsService.delete(id);
        return new responses_1.Ok({
            message,
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateDocumentDto]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, decorators_1.PageQuery)({
        equals: ['cliente_id', 'id'],
        excludes: ['assinatura_validada'],
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_types_1.PageQueryDto]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateDocumentDto]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "delete", null);
DocumentsController = __decorate([
    (0, common_1.Controller)('documents'),
    __metadata("design:paramtypes", [documents_service_1.DocumentsService])
], DocumentsController);
exports.DocumentsController = DocumentsController;
//# sourceMappingURL=documents.controller.js.map