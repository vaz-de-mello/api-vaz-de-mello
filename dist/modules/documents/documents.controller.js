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
const s3_service_1 = require("../s3/s3.service");
const responses_1 = require("../../shared/responses");
const _types_1 = require("../../shared/@types");
const decorators_1 = require("../../shared/decorators");
const utils_1 = require("../../shared/utils");
const dto_1 = require("./dto");
let DocumentsController = class DocumentsController {
    constructor(documentsService, s3Service) {
        this.documentsService = documentsService;
        this.s3Service = s3Service;
    }
    async create(createDocumentDto, { nome }) {
        const document = await this.documentsService.create({
            data: Object.assign(Object.assign({}, createDocumentDto), { usuario: nome }),
        });
        return new responses_1.Ok({
            data: document,
            message: 'Documento criado com sucesso.',
        });
    }
    async getPresignedUrl(fileName, fileType, method) {
        let service;
        switch (method) {
            case 'get':
                service = this.s3Service.getDownloadUrl(fileName);
                break;
            case 'put':
                service = this.s3Service.generatePresignedUrl(fileName, fileType);
                break;
            default:
                service = this.s3Service.getDownloadUrl(fileName);
                break;
        }
        const url = await service;
        return new responses_1.Ok({
            data: { url },
            message: 'Documento criado com sucesso.',
        });
    }
    async findAll({ page, query }) {
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
            include: { precatorio: true },
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
    async update(id, updateDocumentDto, { nome }) {
        const document = await this.documentsService.update({
            where: { id },
            data: Object.assign(Object.assign({}, updateDocumentDto), { usuario: nome }),
        });
        return new responses_1.Ok({
            data: document,
            message: 'Documento atualizado com sucesso.',
        });
    }
    async delete(id) {
        const document = await this.documentsService.findUnique({
            where: { id },
        });
        if (!document)
            throw new common_1.NotFoundException({
                message: 'Documento não encontrado.',
                success: false,
                statusCode: 404,
                error: 'NotFound',
            });
        const [deleteServiceResponse] = await Promise.all([
            this.documentsService.delete(id),
            this.s3Service.deleteFile(`${document.arquivo}_${document.precatorio_id}`),
        ]);
        const { message } = deleteServiceResponse;
        return new responses_1.Ok({
            message,
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateDocumentDto, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("presigned-url"),
    __param(0, (0, common_1.Query)("fileName")),
    __param(1, (0, common_1.Query)("fileType")),
    __param(2, (0, common_1.Query)("method")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "getPresignedUrl", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, decorators_1.PageQuery)({
        equals: ['precatorio_id', 'id'],
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
    __param(2, (0, decorators_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateDocumentDto, Object]),
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
    __metadata("design:paramtypes", [documents_service_1.DocumentsService,
        s3_service_1.S3Service])
], DocumentsController);
exports.DocumentsController = DocumentsController;
//# sourceMappingURL=documents.controller.js.map