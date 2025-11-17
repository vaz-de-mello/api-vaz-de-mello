export declare class UserEntity {
    login: string;
    id: string;
    nome: string;
    email: string;
    senha: string;
    cpf: string;
    data_nascimento: Date;
    escritorio_id: string;
    tipo_perfil_id: number;
    createdAt: Date;
    updatedAt: Date;
    email_verificado: boolean;
    email_token: string | null;
    status: number;
}
export type UserWithoutPassword = Omit<UserEntity, 'senha'>;
