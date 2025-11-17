export interface CalculoIRParams {
    rendimentoBruto: number;
    numeroMeses: number;
    aliquota: number;
    parcelaADeduzir: number;
}
interface FaixaIR {
    max: number | null;
    aliquota: number;
    parcela: number;
}
export type TabelaIR = FaixaIR[];
export {};
