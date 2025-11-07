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
exports.CalculatorRRADto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CalculatorRRADto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "O campo `Número de Meses (RRA)` é obrigatório." }),
    (0, class_validator_1.IsInt)({ message: "O campo `Número de Meses` deve ser um número inteiro." }),
    (0, class_validator_1.IsPositive)({ message: "O campo `Número de Meses` deve ser um número positivo." }),
    __metadata("design:type", Number)
], CalculatorRRADto.prototype, "numeroMeses", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "O campo `Deduções` é obrigatório." }),
    (0, class_validator_1.IsInt)({ message: "O campo `Deduções` deve ser um número inteiro." }),
    __metadata("design:type", Number)
], CalculatorRRADto.prototype, "deducoes", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }, { message: 'O campo `Imposto Retido` deve ser um número com no máximo duas casas decimais.' }),
    (0, class_validator_1.IsPositive)({ message: 'O campo `Imposto Retido` deve ser um número positivo.' }),
    (0, class_validator_1.Min)(0, { message: 'O campo `Imposto Retido` mínimo é 0.' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CalculatorRRADto.prototype, "impostoRetido", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "O campo `Valor principal` é obrigatório." }),
    (0, class_validator_1.IsNumber)({ allowNaN: false, allowInfinity: false }, { message: "O campo `Valor principal` deve ser um número positivo." }),
    (0, class_validator_1.IsPositive)({ message: "O campo `Valor principal` deve ser um número positivo." }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CalculatorRRADto.prototype, "rendimentoTotal", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: 'O campo `Ano` deve ser um número inteiro.' }),
    (0, class_validator_1.Min)(2020, { message: 'O campo `Ano` mínimo permitido é 2020.' }),
    (0, class_validator_1.Max)(2025, { message: 'O campo `Ano` máximo permitido é 2025.' }),
    __metadata("design:type", Number)
], CalculatorRRADto.prototype, "ano", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "O campo `Mês` é obrigatório." }),
    (0, class_validator_1.IsString)({ message: "O campo `Mês` deve ser uma string." }),
    (0, class_validator_1.IsIn)(['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'], { message: 'O campo `Mês` deve ser um destes valores: jan, fev, mar, abr, mai, jun, jul, ago, set, out, nov, dez.' }),
    __metadata("design:type", String)
], CalculatorRRADto.prototype, "mes", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(undefined, { message: "O campo `Data de Começo da Selic` deve ser uma data." }),
    __metadata("design:type", Date)
], CalculatorRRADto.prototype, "selicStartDate", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(undefined, { message: "O campo `Data de Término da Selic` deve ser uma data." }),
    __metadata("design:type", Date)
], CalculatorRRADto.prototype, "selicEndDate", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(undefined, { message: "O campo `Data de Nascimento` deve ser uma data." }),
    __metadata("design:type", Date)
], CalculatorRRADto.prototype, "userBirthDate", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)({ message: 'O campo `hasDisease` deve ser um booleano.' }),
    __metadata("design:type", Boolean)
], CalculatorRRADto.prototype, "hasDisease", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'O campo `hasDisease` deve ser um texto.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CalculatorRRADto.prototype, "precatoryDerivedBy", void 0);
exports.CalculatorRRADto = CalculatorRRADto;
