import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/modules/database/database.service';
import { PageDto } from 'src/shared/@types';
import { UserEntity } from './entities';
export declare class UsersService {
    private readonly db;
    constructor(db: DatabaseService);
    create(createUserDto: Prisma.UsuarioCreateArgs): Promise<{
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
    }>;
    findAll(query: Partial<UserEntity>, page: PageDto): Promise<[number, ({
        escritorio: {
            id: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
            nome_fantasia: string;
            telefone: string;
            cnpj: string;
            api_key: string;
            responsaveis_legais: string;
            dominio_white_label: string;
            logo: string;
        };
        tipo_perfil: {
            id: number;
            descricao: string;
        };
    } & {
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
    })[]]>;
    findFirst(args: Prisma.UsuarioFindFirstArgs): Promise<{
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
    }>;
    findUnique(args: Prisma.UsuarioFindUniqueArgs): Promise<{
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
    }>;
    update(updateUserDto: Prisma.UsuarioUpdateArgs): Promise<{
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
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
