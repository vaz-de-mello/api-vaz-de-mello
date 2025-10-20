import { TipoDocumento } from '@prisma/client';
export declare class CreateDocumentDto {
    cliente_id: string;
    tipo_documento: TipoDocumento;
    arquivo: string;
    assinatura_validada: boolean;
}
