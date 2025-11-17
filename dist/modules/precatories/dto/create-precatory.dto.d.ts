import { HonorariosDestacados } from '@prisma/client';
export declare class CreatePrecatoryDto {
    cliente_id: string;
    data_levantamento: string;
    valor_bruto: number;
    valor_irrf_retido: number;
    valor_restituicao: number;
    valor_simulador_RRA: number;
    valor_corrigido_SELIC: number;
    rra_meses: number;
    tribunal_pagador: string;
    tipo_verba: string;
    honorarios_destacados: HonorariosDestacados;
    percentual_honorario: number;
    valor_honorario: number;
    processo_origem: string;
    oficio_pdf: string;
    comprovante_pdf: string;
    tese_aplicada: string;
    data_base: string;
    precatorio_derivado: string;
    doenca: string;
    doenca_grave: boolean;
}
