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
exports.CreateRestituitionDto = void 0;
const client_1 = require("@prisma/client");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateRestituitionDto {
}
__decorate([
    (0, class_validator_1.IsUUID)(undefined, { message: '`precatorio_id` deve ser um UUID válido.' }),
    __metadata("design:type", String)
], CreateRestituitionDto.prototype, "precatorio_id", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.TeseAplicada, {
        message: '`tese_aplicada` deve ser um valor válido da enum TeseAplicada.',
    }),
    __metadata("design:type", String)
], CreateRestituitionDto.prototype, "tese_aplicada", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: '`valor_simulador_RRA` deve ser um número.' }),
    (0, class_validator_1.Min)(0, { message: '`valor_simulador_RRA` não pode ser negativo.' }),
    __metadata("design:type", Number)
], CreateRestituitionDto.prototype, "valor_simulador_RRA", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: '`valor_ir_devido` deve ser um número.' }),
    (0, class_validator_1.Min)(0, { message: '`valor_ir_devido` não pode ser negativo.' }),
    __metadata("design:type", Number)
], CreateRestituitionDto.prototype, "valor_ir_devido", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: '`diferenca_IR` deve ser um número.' }),
    (0, class_validator_1.Min)(0, { message: '`diferenca_IR` não pode ser negativo.' }),
    __metadata("design:type", Number)
], CreateRestituitionDto.prototype, "diferenca_IR", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: '`valor_corrigido_SELIC` deve ser um número.' }),
    (0, class_validator_1.Min)(0, { message: '`valor_corrigido_SELIC` não pode ser negativo.' }),
    __metadata("design:type", Number)
], CreateRestituitionDto.prototype, "valor_corrigido_SELIC", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)({
        message: '`necessita_calculo_judicial` deve ser um booleano true ou false.',
    }),
    __metadata("design:type", Boolean)
], CreateRestituitionDto.prototype, "necessita_calculo_judicial", void 0);
__decorate([
    (0, class_validator_1.IsDateString)({}, { message: '`data_calculo` deve ser uma data válida no formato ISO.' }),
    __metadata("design:type", String)
], CreateRestituitionDto.prototype, "data_calculo", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.StatusRestituicao, {
        message: '`status` deve ser um desses valores: \'em_analise\', \'elegivel\', \'protocolado\', \'indeferido\', \'pago\',.',
    }),
    __metadata("design:type", String)
], CreateRestituitionDto.prototype, "status", void 0);
exports.CreateRestituitionDto = CreateRestituitionDto;
//# sourceMappingURL=create-restituition.dto.js.map