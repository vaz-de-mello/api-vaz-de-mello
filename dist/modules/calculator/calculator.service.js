"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculatorService = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../../shared/utils");
let CalculatorService = class CalculatorService {
    getTabelaIRRF(mesAbrev, ano) {
        const chave = `${mesAbrev.toLowerCase()}-${ano}`;
        const tabelas = {
            'mai-2025': [
                { max: 2428.80, aliquota: 0, parcela: 0 },
                { max: 2826.65, aliquota: 0.075, parcela: 182.16 },
                { max: 3751.05, aliquota: 0.15, parcela: 394.16 },
                { max: 4664.68, aliquota: 0.225, parcela: 675.49 },
                { max: null, aliquota: 0.275, parcela: 908.73 },
            ],
            'jun-2025': [],
            'jul-2025': [],
            'fev-2024': [
                { max: 2259.20, aliquota: 0, parcela: 0 },
                { max: 2826.65, aliquota: 0.075, parcela: 169.44 },
                { max: 3751.05, aliquota: 0.15, parcela: 381.44 },
                { max: 4664.68, aliquota: 0.225, parcela: 662.77 },
                { max: null, aliquota: 0.275, parcela: 896.00 },
            ],
            'mar-2024': [],
            'abr-2024': [],
            'mai-2024': [],
            'jun-2024': [],
            'jul-2024': [],
            'ago-2024': [],
            'set-2024': [],
            'out-2024': [],
            'nov-2024': [],
            'dez-2024': [],
            'jan-2025': [],
            'fev-2025': [],
            'mar-2025': [],
            'abr-2025': [],
            'mai-2023': [
                { max: 2112.00, aliquota: 0, parcela: 0 },
                { max: 2826.65, aliquota: 0.075, parcela: 158.40 },
                { max: 3751.05, aliquota: 0.15, parcela: 370.40 },
                { max: 4664.68, aliquota: 0.225, parcela: 651.73 },
                { max: null, aliquota: 0.275, parcela: 884.96 },
            ],
            'jun-2023': [],
            'jan-2020': [
                { max: 1903.98, aliquota: 0, parcela: 0 },
                { max: 2826.65, aliquota: 0.075, parcela: 142.8 },
                { max: 3751.05, aliquota: 0.15, parcela: 354.8 },
                { max: 4664.68, aliquota: 0.225, parcela: 636.13 },
                { max: null, aliquota: 0.275, parcela: 869.36 },
            ]
        };
        const copyRange = (from, toMonths) => {
            const t = tabelas[from];
            toMonths.forEach(m => tabelas[m] = t);
        };
        const meses2020a2023 = [];
        const abrevs = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
        for (let ano = 2020; ano <= 2023; ano++) {
            const limit = ano === 2023 ? 3 : 11;
            for (let i = 0; i <= limit; i++) {
                const chave = `${abrevs[i]}-${ano}`;
                if (chave !== 'jan-2020')
                    meses2020a2023.push(chave);
            }
        }
        copyRange('jan-2020', meses2020a2023);
        copyRange('mai-2025', ['jun-2025', 'jul-2025', 'ago-2025', 'set-2025', 'out-2025', 'nov-2025', 'dez-2025']);
        copyRange('fev-2024', ['mar-2024', 'abr-2024', 'mai-2024', 'jun-2024', 'jul-2024', 'ago-2024', 'set-2024', 'out-2024', 'nov-2024', 'dez-2024', 'jan-2025', 'fev-2025', 'mar-2025', 'abr-2025']);
        copyRange('mai-2023', ['jun-2023', 'jul-2023', 'ago-2023', 'set-2023', 'out-2023', 'nov-2023', 'dez-2023', 'jan-2024']);
        copyRange('mai-2023', ['jun-2023', 'jul-2023', 'ago-2023', 'set-2023', 'out-2023', 'nov-2023', 'dez-2023', 'jan-2024']);
        return tabelas[chave] || null;
    }
    getFaixasRRA(value, mesAbrev, ano) {
        const faixasRRA = this.getTabelaIRRF(mesAbrev, ano);
        return faixasRRA.find(faixa => faixa.max === null || faixa.max >= value);
    }
    calculateRRA(mesesDeIsencaoIdoso, { rendimentoTotal, numeroMeses, ano, mes, }) {
        const LIMITE_MENSAL_IDOSO = 1903.98;
        const monthlyValue = rendimentoTotal / numeroMeses;
        const { aliquota, parcela, } = this.getFaixasRRA(+(monthlyValue).toFixed(2), mes, ano);
        if (!aliquota) {
            return { totalRRA: 0 };
        }
        const rendimentoTotalIdoso = (mesesDeIsencaoIdoso * monthlyValue);
        const rendimentoSemIdoso = rendimentoTotal - +(rendimentoTotalIdoso).toFixed(2);
        let totalRRASemIdoso = 0;
        if (numeroMeses - mesesDeIsencaoIdoso > 0) {
            totalRRASemIdoso = this.calcularIRTotal({
                rendimentoBruto: rendimentoSemIdoso,
                numeroMeses: numeroMeses - mesesDeIsencaoIdoso,
                aliquota,
                parcelaADeduzir: parcela,
            });
        }
        let totalRRAIdoso = 0;
        if (mesesDeIsencaoIdoso > 0) {
            const monthlyValueIdoso = (+(rendimentoTotalIdoso).toFixed(2) / mesesDeIsencaoIdoso) - LIMITE_MENSAL_IDOSO;
            const { aliquota: aliquotaIdoso, parcela: parcelaIdoso, } = this.getFaixasRRA(monthlyValueIdoso, mes, ano);
            if (aliquotaIdoso) {
                totalRRAIdoso = this.calcularIRTotal({
                    rendimentoBruto: rendimentoTotalIdoso,
                    numeroMeses: mesesDeIsencaoIdoso,
                    aliquota: aliquotaIdoso,
                    parcelaADeduzir: parcelaIdoso,
                });
            }
        }
        return { totalRRA: totalRRASemIdoso + totalRRAIdoso };
    }
    calcularIRTotal({ rendimentoBruto, numeroMeses, aliquota, parcelaADeduzir, }) {
        const baseMensal = (0, utils_1.roundNumber2Cases)((rendimentoBruto) / numeroMeses);
        const irMensal = (0, utils_1.roundNumber2Cases)(baseMensal * aliquota) - parcelaADeduzir;
        const irTotal = (0, utils_1.roundNumber2Cases)(Math.max(irMensal * numeroMeses, 0));
        return irTotal;
    }
    mesesComMaisDe65(dataInicial, dataNascimento, numeroDeMeses) {
        let mesesCom65ouMais = 0;
        for (let i = 0; i < numeroDeMeses; i++) {
            const dataAtual = new Date(dataInicial.getFullYear(), dataInicial.getMonth() + i, dataInicial.getDate());
            const data65Anos = new Date(dataNascimento.getFullYear() + 65, dataNascimento.getMonth(), dataNascimento.getDate());
            if (dataAtual >= data65Anos) {
                mesesCom65ouMais++;
            }
        }
        return mesesCom65ouMais;
    }
};
CalculatorService = __decorate([
    (0, common_1.Injectable)()
], CalculatorService);
exports.CalculatorService = CalculatorService;
