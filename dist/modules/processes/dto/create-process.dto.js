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
exports.CreateProcessDto = void 0;
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
class CreateProcessDto {
}
__decorate([
    (0, class_validator_1.IsUUID)(undefined, { message: '`cliente_id` deve ser um UUID válido.' }),
    __metadata("design:type", String)
], CreateProcessDto.prototype, "cliente_id", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(undefined, { message: '`escritorio_id` deve ser um UUID válido.' }),
    __metadata("design:type", String)
], CreateProcessDto.prototype, "escritorio_id", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: '`numero_processo` deve ser uma string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: '`numero_processo` é obrigatório.' }),
    __metadata("design:type", String)
], CreateProcessDto.prototype, "numero_processo", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: '`vara_juizo` deve ser uma string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: '`vara_juizo` é obrigatória.' }),
    __metadata("design:type", String)
], CreateProcessDto.prototype, "vara_juizo", void 0);
__decorate([
    (0, class_validator_1.IsDateString)({}, { message: '`data_protocolo` deve ser uma data válida no formato ISO.' }),
    __metadata("design:type", String)
], CreateProcessDto.prototype, "data_protocolo", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: '`documentos_juntados` deve ser uma string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: '`documentos_juntados` é obrigatório.' }),
    __metadata("design:type", String)
], CreateProcessDto.prototype, "documentos_juntados", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.PlataformaDistribuicao, {
        message: '`plataforma_distribuicao` deve ser \'Legal_One\', \'Projudi\', \'PJe\' ou \'Outro\'.',
    }),
    __metadata("design:type", String)
], CreateProcessDto.prototype, "plataforma_distribuicao", void 0);
exports.CreateProcessDto = CreateProcessDto;
//# sourceMappingURL=create-process.dto.js.map