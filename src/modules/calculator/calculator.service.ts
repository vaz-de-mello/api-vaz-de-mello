import { Injectable } from '@nestjs/common';

import { roundNumber2Cases } from 'src/shared/utils';

import { CalculatorRRADto, CalculoIRParams, TabelaIR } from './dto';

@Injectable()
export class CalculatorService {
    private getTabelaIRRF(mesAbrev: string, ano: number): TabelaIR | null {
        const chave = `${mesAbrev.toLowerCase()}-${ano}`;

        const tabelas = {
            // Maio 2025 até Julho 2025
            'mai-2025': [
                { max: 2428.80, aliquota: 0, parcela: 0 },
                { max: 2826.65, aliquota: 0.075, parcela: 182.16 },
                { max: 3751.05, aliquota: 0.15, parcela: 394.16 },
                { max: 4664.68, aliquota: 0.225, parcela: 675.49 },
                { max: null, aliquota: 0.275, parcela: 908.73 },
            ],
            'jun-2025': [],
            'jul-2025': [],
            // Fevereiro 2024 a Abril 2025
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
            // Maio 2023 a Janeiro 2024
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
            // até jan 2024...
        };

        const copyRange = (from: string, toMonths: string[]) => {
            const t = tabelas[from];
            toMonths.forEach(m => tabelas[m] = t);
        };

        // Jan 2020 até Abr 2023
        const meses2020a2023 = [];
        const abrevs = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
        for (let ano = 2020; ano <= 2023; ano++) {
            const limit = ano === 2023 ? 3 : 11; // até abr-2023 (índice 3)
            for (let i = 0; i <= limit; i++) {
                const chave = `${abrevs[i]}-${ano}`;
                if (chave !== 'jan-2020') meses2020a2023.push(chave);
            }
        }
        copyRange('jan-2020', meses2020a2023);

        copyRange('mai-2025', ['jun-2025', 'jul-2025']);
        copyRange('fev-2024', ['mar-2024', 'abr-2024', 'mai-2024', 'jun-2024', 'jul-2024', 'ago-2024', 'set-2024', 'out-2024', 'nov-2024', 'dez-2024', 'jan-2025', 'fev-2025', 'mar-2025', 'abr-2025']);
        copyRange('mai-2023', ['jun-2023', 'jul-2023', 'ago-2023', 'set-2023', 'out-2023', 'nov-2023', 'dez-2023', 'jan-2024']);
        copyRange('mai-2023', ['jun-2023', 'jul-2023', 'ago-2023', 'set-2023', 'out-2023', 'nov-2023', 'dez-2023', 'jan-2024']);

        return tabelas[chave] || null;
    }

    private getFaixasRRA(value: number, mesAbrev: string, ano: number) {
        const faixasRRA = this.getTabelaIRRF(mesAbrev, ano);
        return faixasRRA.find(faixa => faixa.max === null || faixa.max >= value);
    }

    calculateRRA({
        rendimentoTotal,
        numeroMeses,
        deducoes,
        ano,
        mes,
    }: CalculatorRRADto) {
        const monthlyValue = +((rendimentoTotal - deducoes) / numeroMeses).toFixed(2);
        const {
            aliquota,
            parcela,
        } = this.getFaixasRRA(monthlyValue, mes, ano);
        if (!aliquota) {
            return { totalRRA: 0 };
        }

        const totalRRA = this.calcularIRTotal({
            rendimentoBruto: rendimentoTotal,
            deducoesTotais: deducoes,
            numeroMeses: numeroMeses,
            aliquota,
            parcelaADeduzir: parcela,
        });

        return { totalRRA };
    }

    private calcularIRTotal({
        rendimentoBruto,
        deducoesTotais,
        numeroMeses,
        aliquota,
        parcelaADeduzir,
    }: CalculoIRParams): number {

        const baseMensal = roundNumber2Cases((rendimentoBruto - deducoesTotais) / numeroMeses);
        const irMensal = roundNumber2Cases(baseMensal * aliquota) - parcelaADeduzir;
        const irTotal = roundNumber2Cases(Math.max(irMensal * numeroMeses, 0));

        return irTotal;
    }
}