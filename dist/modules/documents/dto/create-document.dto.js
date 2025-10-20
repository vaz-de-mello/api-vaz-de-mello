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
exports.CreateDocumentDto = void 0;
const client_1 = require("@prisma/client");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateDocumentDto {
}
__decorate([
    (0, class_validator_1.IsUUID)(undefined, { message: '`cliente_id` deve ser um UUID válido.' }),
    __metadata("design:type", String)
], CreateDocumentDto.prototype, "cliente_id", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.TipoDocumento, {
        message: '`tipo_documento` deve ser um tipo válido (RG, CPF, CNH, etc).',
    }),
    __metadata("design:type", String)
], CreateDocumentDto.prototype, "tipo_documento", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: '`arquivo` deve ser uma URL ou caminho em string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: '`arquivo` é obrigatório.' }),
    __metadata("design:type", String)
], CreateDocumentDto.prototype, "arquivo", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)({ message: '`assinatura_validada` deve ser verdadeiro ou falso.' }),
    __metadata("design:type", Boolean)
], CreateDocumentDto.prototype, "assinatura_validada", void 0);
exports.CreateDocumentDto = CreateDocumentDto;
//# sourceMappingURL=create-document.dto.js.map