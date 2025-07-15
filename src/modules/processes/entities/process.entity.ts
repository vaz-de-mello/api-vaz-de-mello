import { PlataformaDistribuicao } from "@prisma/client";

export class ProcessEntity {
    id: string;
    cliente_id: string;
    escritorio_id: string;
    numero_processo: string;
    vara_juizo: string;
    data_protocolo: Date;
    documentos_juntados: string;
    plataforma_distribuicao: PlataformaDistribuicao;
    createdAt: Date;
    updatedAt: Date;
}
