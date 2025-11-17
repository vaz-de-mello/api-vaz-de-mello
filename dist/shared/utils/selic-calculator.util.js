"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selicCalculator = void 0;
;
async function selicCalculator({ value, startDate, endDate }) {
    try {
        const resp = await fetch(`https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados?formato=json&dataInicial=${startDate}&dataFinal=${endDate}`);
        const dados = await resp.json();
        const totalFactor = (dados === null || dados === void 0 ? void 0 : dados.reduce) ? dados.reduce((acc, { valor }) => {
            const selic = parseFloat(valor.replace(',', '.'));
            return acc * (1 + selic / 100);
        }, 1) : 1;
        return Number((value * totalFactor).toFixed(2));
    }
    catch (error) {
        console.log('ERROR NA SELIC');
        return value.toFixed(2);
    }
}
exports.selicCalculator = selicCalculator;
//# sourceMappingURL=selic-calculator.util.js.map