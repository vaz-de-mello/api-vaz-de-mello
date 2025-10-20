import { HonorariosDestacados, TipoVerba } from '@prisma/client';
export declare class CreatePrecatoryDto {
    cliente_id: string;
    data_levantamento: string;
    valor_bruto: number;
    valor_irrf_retido: number;
    valor_restituicao: number;
    rra_meses: number;
    tribunal_pagador: string;
    tipo_verba: TipoVerba;
    honorarios_destacados: HonorariosDestacados;
    percentual_honorario: number;
    valor_honorario: number;
    processo_origem: string;
    oficio_pdf: string;
    comprovante_pdf: string;
}
