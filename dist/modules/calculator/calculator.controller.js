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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculatorController = void 0;
const common_1 = require("@nestjs/common");
const calculator_service_1 = require("./calculator.service");
const responses_1 = require("../../shared/responses");
const utils_1 = require("../../shared/utils");
const decorators_1 = require("../../shared/decorators");
const constants_1 = require("../../shared/constants");
const dto_1 = require("./dto");
let CalculatorController = class CalculatorController {
    constructor(calculatorService) {
        this.calculatorService = calculatorService;
    }
    async calculateRRA(body) {
        const { numeroMeses, rendimentoTotal, deducoes, ano, mes, selicEndDate, selicStartDate, userBirthDate, impostoRetido, hasDisease, precatoryDerivedBy, } = body;
        const mesesDeIsencaoIdoso = this.calculatorService.mesesComMaisDe65(new Date(`${ano}-${constants_1.MONTHS_NUMBER_SHORT[mes]}-01T00:00:01`), new Date(userBirthDate), numeroMeses);
        let impostoCorrigido = 0;
        if (hasDisease || (precatoryDerivedBy != 'OUTROS')) {
            impostoCorrigido = impostoRetido;
        }
        else {
            const { totalRRA } = this.calculatorService.calculateRRA(mesesDeIsencaoIdoso, {
                rendimentoTotal: rendimentoTotal - deducoes,
                numeroMeses,
                ano,
                mes,
            });
            impostoCorrigido = impostoRetido - totalRRA;
            if (impostoCorrigido <= 0) {
                return new responses_1.Ok({
                    data: { totalRRA: 0, irSelicFixed: 0 },
                    message: "Cálculo de RRA realizado com sucesso.",
                });
            }
        }
        const irSelicFixed = await (0, utils_1.selicCalculator)({
            endDate: (0, utils_1.dateFormatted)(selicEndDate),
            startDate: (0, utils_1.dateFormatted)(selicStartDate),
            value: impostoCorrigido,
        });
        return new responses_1.Ok({
            data: { totalRRA: impostoCorrigido, irSelicFixed },
            message: "Cálculo de RRA realizado com sucesso.",
        });
    }
};
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('rra'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CalculatorRRADto]),
    __metadata("design:returntype", Promise)
], CalculatorController.prototype, "calculateRRA", null);
CalculatorController = __decorate([
    (0, common_1.Controller)('calculator'),
    __metadata("design:paramtypes", [calculator_service_1.CalculatorService])
], CalculatorController);
exports.CalculatorController = CalculatorController;
