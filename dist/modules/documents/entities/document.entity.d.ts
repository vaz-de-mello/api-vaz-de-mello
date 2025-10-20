import { TipoDocumento } from "@prisma/client";
export declare class DocumentEntity {
    id: string;
    cliente_id: string;
    tipo_documento: TipoDocumento;
    arquivo: string;
    assinatura_validada: boolean;
    createdAt: Date;
    updatedAt: Date;
}
