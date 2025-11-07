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
exports.CreatePrecatoryDto = void 0;
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
class CreatePrecatoryDto {
}
__decorate([
    (0, class_validator_1.IsUUID)(undefined, { message: '`cliente_id` deve ser um UUID válido.' }),
    (0, class_validator_1.IsNotEmpty)({ message: '`cliente_id` é obrigatório.' }),
    __metadata("design:type", String)
], CreatePrecatoryDto.prototype, "cliente_id", void 0);
__decorate([
    (0, class_validator_1.IsDateString)({}, { message: '`data_levantamento` deve ser uma data válida no formato ISO.' }),
    __metadata("design:type", String)
], CreatePrecatoryDto.prototype, "data_levantamento", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: '`valor_bruto` deve ser um número.' }),
    (0, class_validator_1.IsPositive)({ message: '`valor_bruto` deve ser positivo.' }),
    __metadata("design:type", Number)
], CreatePrecatoryDto.prototype, "valor_bruto", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: '`valor_irrf_retido` deve ser um número.' }),
    (0, class_validator_1.Min)(0, { message: '`valor_irrf_retido` não pode ser negativo.' }),
    __metadata("design:type", Number)
], CreatePrecatoryDto.prototype, "valor_irrf_retido", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: '`valor_restituicao` deve ser um número.' }),
    (0, class_validator_1.Min)(0, { message: '`valor_restituicao` não pode ser negativo.' }),
    __metadata("design:type", Number)
], CreatePrecatoryDto.prototype, "valor_restituicao", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: '`valor_simulador_RRA` deve ser um número.' }),
    (0, class_validator_1.Min)(0, { message: '`valor_simulador_RRA` não pode ser negativo.' }),
    __metadata("design:type", Number)
], CreatePrecatoryDto.prototype, "valor_simulador_RRA", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: '`valor_corrigido_SELIC` deve ser um número.' }),
    (0, class_validator_1.Min)(0, { message: '`valor_corrigido_SELIC` não pode ser negativo.' }),
    __metadata("design:type", Number)
], CreatePrecatoryDto.prototype, "valor_corrigido_SELIC", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: '`rra_meses` deve ser um número inteiro.' }),
    (0, class_validator_1.Min)(0, { message: '`rra_meses` deve ser no mínimo 1.' }),
    __metadata("design:type", Number)
], CreatePrecatoryDto.prototype, "rra_meses", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: '`tribunal_pagador` deve ser uma string.' }),
    __metadata("design:type", String)
], CreatePrecatoryDto.prototype, "tribunal_pagador", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: '`tipo_verba` deve ser \'alimentar\', \'auxílio_acidente\', \'indenizatória\' ou \'outros\'.' }),
    __metadata("design:type", String)
], CreatePrecatoryDto.prototype, "tipo_verba", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.HonorariosDestacados, { message: '`honorarios_destacados` deve ser \'Sim\' ou \'Não\'.' }),
    __metadata("design:type", String)
], CreatePrecatoryDto.prototype, "honorarios_destacados", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: '`percentual_honorario` deve ser um número.' }),
    (0, class_validator_1.Min)(0, { message: '`percentual_honorario` não pode ser negativo.' }),
    __metadata("design:type", Number)
], CreatePrecatoryDto.prototype, "percentual_honorario", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: '`valor_honorario` deve ser um número.' }),
    (0, class_validator_1.Min)(0, { message: '`valor_honorario` não pode ser negativo.' }),
    __metadata("design:type", Number)
], CreatePrecatoryDto.prototype, "valor_honorario", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: '`processo_origem` deve ser uma string.' }),
    __metadata("design:type", String)
], CreatePrecatoryDto.prototype, "processo_origem", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: '`oficio_pdf` deve ser uma string válida.' }),
    __metadata("design:type", String)
], CreatePrecatoryDto.prototype, "oficio_pdf", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: '`comprovante_pdf` deve ser uma string válida.' }),
    __metadata("design:type", String)
], CreatePrecatoryDto.prototype, "comprovante_pdf", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: '`tese_aplicada` deve ser uma string válida.' }),
    __metadata("design:type", String)
], CreatePrecatoryDto.prototype, "tese_aplicada", void 0);
__decorate([
    (0, class_validator_1.IsDateString)({}, { message: '`data_base` deve ser uma data válida no formato ISO.' }),
    __metadata("design:type", String)
], CreatePrecatoryDto.prototype, "data_base", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: '`precatorio_derivado` deve ser uma string válida.' }),
    __metadata("design:type", String)
], CreatePrecatoryDto.prototype, "precatorio_derivado", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: '`doenca` deve ser uma string válida.' }),
    __metadata("design:type", String)
], CreatePrecatoryDto.prototype, "doenca", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)({ message: '`doenca_grave` deve ser um booleano.' }),
    __metadata("design:type", Boolean)
], CreatePrecatoryDto.prototype, "doenca_grave", void 0);
exports.CreatePrecatoryDto = CreatePrecatoryDto;
