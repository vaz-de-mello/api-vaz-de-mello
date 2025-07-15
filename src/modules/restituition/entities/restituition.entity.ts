import { StatusRestituicao, TeseAplicada } from "@prisma/client";

export class RestituitionEntity {
    id: string;
    precatorio_id: string;
    tese_aplicada: TeseAplicada;
    valor_simulador_RRA: number;
    valor_ir_devido: number;
    diferenca_IR: number;
    valor_corrigido_SELIC: number;
    necessita_calculo_judicial: boolean;
    data_calculo: Date;
    status: StatusRestituicao;
    createdAt: Date;
    updatedAt: Date;
}
