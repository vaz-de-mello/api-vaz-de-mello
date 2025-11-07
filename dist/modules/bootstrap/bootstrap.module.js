"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BootstrapModule = void 0;
const common_1 = require("@nestjs/common");
const bootstrap_service_1 = require("./bootstrap.service");
const bootstrap_controller_1 = require("./bootstrap.controller");
const offices_module_1 = require("../offices/offices.module");
const users_module_1 = require("../users/users.module");
let BootstrapModule = class BootstrapModule {
};
BootstrapModule = __decorate([
    (0, common_1.Module)({
        controllers: [bootstrap_controller_1.BootstrapController],
        providers: [bootstrap_service_1.BootstrapService],
        imports: [
            offices_module_1.OfficesModule,
            users_module_1.UsersModule,
        ]
    })
], BootstrapModule);
exports.BootstrapModule = BootstrapModule;
