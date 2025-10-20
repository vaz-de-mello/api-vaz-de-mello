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
exports.CreateClientDto = void 0;
const class_validator_1 = require("class-validator");
class CreateClientDto {
}
__decorate([
    (0, class_validator_1.IsString)({ message: '`cpf` deve ser uma string.' }),
    (0, class_validator_1.Matches)(/^\d{11}$/, {
        message: '`cpf` deve conter exatamente 11 dígitos numéricos.',
    }),
    __metadata("design:type", String)
], CreateClientDto.prototype, "cpf", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: '`nome` deve ser uma string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: '`nome` é obrigatório.' }),
    __metadata("design:type", String)
], CreateClientDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsDateString)({}, { message: '`data_nascimento` deve ser uma data válida no formato ISO.' }),
    __metadata("design:type", String)
], CreateClientDto.prototype, "data_nascimento", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)({ message: '`doenca_grave` deve ser um valor booleano (true ou false).' }),
    __metadata("design:type", Boolean)
], CreateClientDto.prototype, "doenca_grave", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: '`laudo_doenca` deve ser uma string.' }),
    __metadata("design:type", String)
], CreateClientDto.prototype, "laudo_doenca", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: '`doenca` deve ser uma string.' }),
    __metadata("design:type", String)
], CreateClientDto.prototype, "doenca", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)({ message: '`hipossuficiente` deve ser um valor booleano (true ou false).' }),
    __metadata("design:type", Boolean)
], CreateClientDto.prototype, "hipossuficiente", void 0);
exports.CreateClientDto = CreateClientDto;
//# sourceMappingURL=create-client.dto.js.map