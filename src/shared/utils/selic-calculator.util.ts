interface SelicEntry {
    data: string;
    valor: string;
};

interface SelicCalculatorParams {
    value: number;
    startDate: string;
    endDate: string;
}

export async function selicCalculator({ value, startDate, endDate }: SelicCalculatorParams) {
    try {
        const resp = await fetch(
            `https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados?formato=json&dataInicial=${startDate}&dataFinal=${endDate}`
        );
        const dados: SelicEntry[] = await resp.json();

        const totalFactor = dados?.reduce ? dados.reduce((acc, { valor }) => {
            const selic = parseFloat(valor.replace(',', '.'));
            return acc * (1 + selic / 100);
        }, 1) : 1;

        return Number((value * totalFactor).toFixed(2));
    } catch (error) {
        console.log('ERROR NA SELIC');
        return value.toFixed(2);
    }
}