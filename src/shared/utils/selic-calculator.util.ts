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
    console.log(`https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados?formato=json&dataInicial=${startDate}&dataFinal=${endDate}`)
    const resp = await fetch(
        `https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados?formato=json&dataInicial=${startDate}&dataFinal=${endDate}`
    );
    const dados: SelicEntry[] = await resp.json();

    const totalFactor = dados.reduce((acc, { valor }) => {
        const selic = parseFloat(valor.replace(',', '.'));
        return acc * (1 + selic / 100);
    }, 1);

    return Number((value * totalFactor).toFixed(2));
}