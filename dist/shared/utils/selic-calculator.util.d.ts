interface SelicCalculatorParams {
    value: number;
    startDate: string;
    endDate: string;
}
export declare function selicCalculator({ value, startDate, endDate }: SelicCalculatorParams): Promise<string | number>;
export {};
