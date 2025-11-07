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
exports.BootstrapController = void 0;
const common_1 = require("@nestjs/common");
const bootstrap_service_1 = require("./bootstrap.service");
const decorators_1 = require("../../shared/decorators");
const responses_1 = require("../../shared/responses");
let BootstrapController = class BootstrapController {
    constructor(bootstrapService) {
        this.bootstrapService = bootstrapService;
    }
    async bootstrap() {
        await this.bootstrapService.bootstrap();
        return new responses_1.Ok({ message: 'Banco inicializado com sucesso.' });
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BootstrapController.prototype, "bootstrap", null);
BootstrapController = __decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Controller)('bootstrap'),
    __metadata("design:paramtypes", [bootstrap_service_1.BootstrapService])
], BootstrapController);
exports.BootstrapController = BootstrapController;
