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
exports.CreateOfficeDto = void 0;
const class_validator_1 = require("class-validator");
class CreateOfficeDto {
}
__decorate([
    (0, class_validator_1.IsString)({ message: '`nome_fantasia` deve ser uma string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: '`nome_fantasia` é obrigatório.' }),
    __metadata("design:type", String)
], CreateOfficeDto.prototype, "nome_fantasia", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: '`telefone` deve ser uma string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: '`telefone` é obrigatório.' }),
    (0, class_validator_1.Matches)(/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/, {
        message: '`telefone` deve estar no formato (99) 99999-9999',
    }),
    __metadata("design:type", String)
], CreateOfficeDto.prototype, "telefone", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: '`email` inválido.' }),
    __metadata("design:type", String)
], CreateOfficeDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: '`cnpj` deve ser uma string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: '`cnpj` é obrigatório.' }),
    (0, class_validator_1.Matches)(/^\d{14}$/, {
        message: '`cnpj` deve conter 14 dígitos numéricos',
    }),
    __metadata("design:type", String)
], CreateOfficeDto.prototype, "cnpj", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: '`api_key` deve ser uma string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: '`api_key` é obrigatória.' }),
    __metadata("design:type", String)
], CreateOfficeDto.prototype, "api_key", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: '`responsaveis_legais` deve ser uma string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: '`responsaveis_legais` é obrigatório.' }),
    __metadata("design:type", String)
], CreateOfficeDto.prototype, "responsaveis_legais", void 0);
__decorate([
    (0, class_validator_1.IsUrl)({}, { message: '`dominio_white_label` deve ser uma URL válida.' }),
    __metadata("design:type", String)
], CreateOfficeDto.prototype, "dominio_white_label", void 0);
__decorate([
    (0, class_validator_1.IsUrl)({}, { message: '`logo` deve ser uma URL válida.' }),
    __metadata("design:type", String)
], CreateOfficeDto.prototype, "logo", void 0);
exports.CreateOfficeDto = CreateOfficeDto;
