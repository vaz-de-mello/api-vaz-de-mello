import { PlataformaDistribuicao } from '@prisma/client';
export declare class CreateProcessDto {
    cliente_id: string;
    escritorio_id: string;
    numero_processo: string;
    vara_juizo: string;
    data_protocolo: string;
    documentos_juntados: string;
    plataforma_distribuicao: PlataformaDistribuicao;
}
