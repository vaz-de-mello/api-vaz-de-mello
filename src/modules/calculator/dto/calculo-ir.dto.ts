export interface CalculoIRParams {
    rendimentoBruto: number;
    deducoesTotais: number;
    numeroMeses: number;
    aliquota: number;
    parcelaADeduzir: number;
};

interface FaixaIR {
    max: number | null;
    aliquota: number;
    parcela: number;
};
export type TabelaIR = FaixaIR[];