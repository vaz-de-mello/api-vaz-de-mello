"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrecatoriesModule = void 0;
const common_1 = require("@nestjs/common");
const precatories_service_1 = require("./precatories.service");
const precatories_controller_1 = require("./precatories.controller");
const calculator_module_1 = require("../calculator/calculator.module");
let PrecatoriesModule = class PrecatoriesModule {
};
PrecatoriesModule = __decorate([
    (0, common_1.Module)({
        controllers: [precatories_controller_1.PrecatoriesController],
        providers: [precatories_service_1.PrecatoriesService],
        imports: [calculator_module_1.CalculatorModule],
    })
], PrecatoriesModule);
exports.PrecatoriesModule = PrecatoriesModule;
//# sourceMappingURL=precatories.module.js.map