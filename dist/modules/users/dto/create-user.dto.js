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
exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
class CreateUserDto {
}
__decorate([
    (0, class_validator_1.IsString)({ message: '`nome` deve ser uma string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: '`nome` é obrigatório.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: '`login` deve ser uma string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: '`login` é obrigatório.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "login", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: '`email` deve ser um e-mail válido.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: '`cpf` deve ser uma string.' }),
    (0, class_validator_1.Matches)(/^\d{11}$/, {
        message: '`cpf` deve conter exatamente 11 dígitos numéricos.',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "cpf", void 0);
__decorate([
    (0, class_validator_1.IsDateString)({}, { message: '`data_nascimento` deve ser uma data válida no formato ISO.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "data_nascimento", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(undefined, { message: '`escritorio_id` deve ser um UUID válido.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "escritorio_id", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: '`tipo_perfil_id` deve ser um número inteiro.' }),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "tipo_perfil_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(8, 100),
    __metadata("design:type", String)
], CreateUserDto.prototype, "senha", void 0);
exports.CreateUserDto = CreateUserDto;
