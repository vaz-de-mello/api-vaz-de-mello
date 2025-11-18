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
exports.UpdatePrecatoryClientDto = exports.UpdatePrecatoryDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_precatory_dto_1 = require("./create-precatory.dto");
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
const class_transformer_1 = require("class-transformer");
class UpdatePrecatoryDto extends (0, mapped_types_1.PartialType)(create_precatory_dto_1.CreatePrecatoryDto) {
}
__decorate([
    (0, class_validator_1.IsNumber)(undefined, { message: 'O campo `status` deve ser um inteiro.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdatePrecatoryDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: '`laudo_doenca` deve ser uma string.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePrecatoryDto.prototype, "laudo_doenca", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: '`numero_processo` deve ser uma string.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePrecatoryDto.prototype, "numero_processo", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: '`vara_juizo` deve ser uma string.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePrecatoryDto.prototype, "vara_juizo", void 0);
__decorate([
    (0, class_validator_1.IsDateString)({}, { message: '`data_protocolo` deve ser uma data válida no formato ISO.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePrecatoryDto.prototype, "data_protocolo", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.PlataformaDistribuicao, {
        message: '`plataforma_distribuicao` deve ser \'Legal_One\', \'Projudi\', \'PJe\' ou \'Outro\'.',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePrecatoryDto.prototype, "plataforma_distribuicao", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: '`valor_simulador_RRA` deve ser um número.' }),
    (0, class_validator_1.Min)(0, { message: '`valor_simulador_RRA` não pode ser negativo.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdatePrecatoryDto.prototype, "valor_simulador_RRA", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: '`valor_ir_devido` deve ser um número.' }),
    (0, class_validator_1.Min)(0, { message: '`valor_ir_devido` não pode ser negativo.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdatePrecatoryDto.prototype, "valor_ir_devido", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: '`diferenca_IR` deve ser um número.' }),
    (0, class_validator_1.Min)(0, { message: '`diferenca_IR` não pode ser negativo.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdatePrecatoryDto.prototype, "diferenca_IR", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: '`valor_corrigido_SELIC` deve ser um número.' }),
    (0, class_validator_1.Min)(0, { message: '`valor_corrigido_SELIC` não pode ser negativo.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdatePrecatoryDto.prototype, "valor_corrigido_SELIC", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)({
        message: '`necessita_calculo_judicial` deve ser um booleano true ou false.',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdatePrecatoryDto.prototype, "necessita_calculo_judicial", void 0);
__decorate([
    (0, class_validator_1.IsDateString)({}, { message: '`data_calculo` deve ser uma data válida no formato ISO.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePrecatoryDto.prototype, "data_calculo", void 0);
exports.UpdatePrecatoryDto = UpdatePrecatoryDto;
class UpdatePrecatoryClientDto {
}
__decorate([
    (0, class_validator_1.IsString)({ message: '`nome` deve ser uma string.' }),
    __metadata("design:type", String)
], UpdatePrecatoryClientDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: '`cpf` deve ser uma string.' }),
    __metadata("design:type", String)
], UpdatePrecatoryClientDto.prototype, "cpf", void 0);
__decorate([
    (0, class_validator_1.IsDateString)({}, { message: '`data_nascimento` deve ser uma data válida no formato ISO.' }),
    __metadata("design:type", String)
], UpdatePrecatoryClientDto.prototype, "data_nascimento", void 0);
exports.UpdatePrecatoryClientDto = UpdatePrecatoryClientDto;
//# sourceMappingURL=update-precatory.dto.js.map