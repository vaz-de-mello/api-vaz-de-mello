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
exports.ProcessesController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const processes_service_1 = require("./processes.service");
const responses_1 = require("../../shared/responses");
const _types_1 = require("../../shared/@types");
const decorators_1 = require("../../shared/decorators");
const utils_1 = require("../../shared/utils");
const dto_1 = require("./dto");
let ProcessesController = class ProcessesController {
    constructor(processesService) {
        this.processesService = processesService;
    }
    async create(createProcessDto) {
        const process = await this.processesService.create({
            data: createProcessDto,
        });
        return new responses_1.Ok({ data: process, message: 'Processo criado com sucesso.' });
    }
    async findAll({ page, query }) {
        const [total, processes] = await this.processesService.findAll(query, page);
        const response = (0, utils_1.createPaginatedResponse)({
            data: processes,
            total,
            page,
        });
        return new responses_1.Ok(response);
    }
    async findOne(id) {
        const process = await this.processesService.findUnique({
            where: { id },
            include: {
                cliente: true,
                escritorio: true,
            }
        });
        if (!process)
            throw new common_1.NotFoundException({
                message: 'Processo não encontrado.',
                success: false,
                statusCode: 404,
                error: 'NotFound',
            });
        return new responses_1.Ok({ data: process, message: 'Processo encontrado com sucesso.' });
    }
    async update(id, updateProcessDto) {
        const process = await this.processesService.update({
            where: { id },
            data: updateProcessDto,
        });
        return new responses_1.Ok({ data: process, message: 'Processo atualizado com sucesso.' });
    }
    async delete(id) {
        const { message } = await this.processesService.delete(id);
        return new responses_1.Ok({ message });
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateProcessDto]),
    __metadata("design:returntype", Promise)
], ProcessesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, decorators_1.PageQuery)({
        caseSensitive: ['vara_juizo'],
        equals: ['id', 'escritorio_id', 'cliente_id', 'plataforma_distribuicao'],
        enumValidator: [
            {
                key: 'plataforma_distribuicao',
                enum: client_1.PlataformaDistribuicao,
            },
        ]
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_types_1.PageQueryDto]),
    __metadata("design:returntype", Promise)
], ProcessesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProcessesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateProcessDto]),
    __metadata("design:returntype", Promise)
], ProcessesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProcessesController.prototype, "delete", null);
ProcessesController = __decorate([
    (0, common_1.Controller)('processes'),
    __metadata("design:paramtypes", [processes_service_1.ProcessesService])
], ProcessesController);
exports.ProcessesController = ProcessesController;
//# sourceMappingURL=processes.controller.js.map