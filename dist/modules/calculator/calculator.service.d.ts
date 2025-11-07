import { CalculatorRRADto } from './dto';
export declare class CalculatorService {
    private getTabelaIRRF;
    private getFaixasRRA;
    calculateRRA(mesesDeIsencaoIdoso: number, { rendimentoTotal, numeroMeses, ano, mes, }: Omit<CalculatorRRADto, "selicStartDate" | "selicEndDate" | "userBirthDate" | "deducoes" | "impostoRetido" | "hasDisease" | "precatoryDerivedBy">): {
        totalRRA: number;
    };
    private calcularIRTotal;
    mesesComMaisDe65(dataInicial: Date, dataNascimento: Date, numeroDeMeses: number): number;
}
