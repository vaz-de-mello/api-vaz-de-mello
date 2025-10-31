export class DocumentEntity {
    id: string;
    cliente_id: string;
    tipo_documento: string;
    arquivo: string;
    assinatura_validada: boolean;
    createdAt: Date;
    updatedAt: Date;
}
