import { DatabaseService } from '../database/database.service';
import { Prisma } from '@prisma/client';
export declare class ConversationsService {
    private readonly db;
    constructor(db: DatabaseService);
    create(createConversationDto: Prisma.ConversaCreateArgs): Promise<{
        id: string;
        usuario_id: string;
        texto: string;
        precatorio_id: string;
        usuario_nome: string;
        precatorioaId: string;
    }>;
    findByPrecatory(precatorio_id: string): Promise<({
        usuario: {
            senha: string;
            login: string;
            id: string;
            nome: string;
            email: string;
            cpf: string;
            data_nascimento: Date;
            escritorio_id: string;
            tipo_perfil_id: number;
            createdAt: Date;
            updatedAt: Date;
            email_verificado: boolean;
            email_token: string;
            status: number;
        };
    } & {
        id: string;
        usuario_id: string;
        texto: string;
        precatorio_id: string;
        usuario_nome: string;
        precatorioaId: string;
    })[]>;
    update(updateConversationDto: Prisma.ConversaUpdateArgs): Promise<{
        id: string;
        usuario_id: string;
        texto: string;
        precatorio_id: string;
        usuario_nome: string;
        precatorioaId: string;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
