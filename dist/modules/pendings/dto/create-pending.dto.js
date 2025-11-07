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
exports.CreatePendingDto = void 0;
const class_validator_1 = require("class-validator");
class CreatePendingDto {
}
__decorate([
    (0, class_validator_1.IsUUID)(undefined, { message: 'O campo "precatorio_id" deve ser um UUID válido.' }),
    __metadata("design:type", String)
], CreatePendingDto.prototype, "precatorio_id", void 0);
__decorate([
    (0, class_validator_1.IsJSON)({ message: 'O campo "conteudo" deve ser um JSON.' }),
    __metadata("design:type", String)
], CreatePendingDto.prototype, "conteudo", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'O campo "categoria" deve ser um texto.' }),
    (0, class_validator_1.Length)(1, 100, { message: 'O campo "categoria" deve ter entre 1 e 100 caracteres.' }),
    __metadata("design:type", String)
], CreatePendingDto.prototype, "categoria", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'O campo "responsáveis" deve ser um texto.' }),
    (0, class_validator_1.Length)(1, 500, { message: 'O campo "responsáveis" deve ter entre 1 e 500 caracteres.' }),
    __metadata("design:type", String)
], CreatePendingDto.prototype, "responsaveis", void 0);
__decorate([
    (0, class_validator_1.IsDateString)({}, { message: 'O campo "data_final" deve ser uma data válida no formato ISO (YYYY-MM-DD).' }),
    __metadata("design:type", String)
], CreatePendingDto.prototype, "data_final", void 0);
exports.CreatePendingDto = CreatePendingDto;
