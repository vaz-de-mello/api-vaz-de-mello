import {
    BadRequestException,
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Prisma } from '@prisma/client';

import { DatabaseService } from '../database/database.service';

import { PageDto } from 'src/shared/@types';

import { ClientEntity } from './entities';

@Injectable()
export class ClientsService {
    constructor(
        private readonly db: DatabaseService,
    ) { }

    async create(createClientArgs: Prisma.ClienteCreateArgs) {
        try {
            const office = await this.db.cliente.create(createClientArgs);
            return office;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                switch (error.code) {
                    case 'P2002':
                        // Violação de campo único
                        const fields = (error.meta?.target as string[])?.join(', ') || 'campos únicos';
                        throw new ConflictException(`Já existe um cliente com os seguintes dados duplicados: ${fields}.`);

                    case 'P2009':
                        // Dados inválidos enviados
                        throw new BadRequestException('Dados inválidos enviados para o banco.');

                    default:
                        throw new InternalServerErrorException('Erro desconhecido ao criar cliente.');
                }
            }

            // Erros fora do Prisma
            console.log(error);
            throw new InternalServerErrorException('Erro interno no servidor.', error.toString());
        }
    }

    async findAll(query: Partial<ClientEntity>, page: PageDto) {
        return this.db.$transaction([
            this.db.cliente.count({ where: query }),
            this.db.cliente.findMany({
                where: query,
                ...page,
                orderBy: { createdAt: 'desc' },
            })
        ])
    }

    async findUnique(args: Prisma.ClienteFindUniqueArgs) {
        return this.db.cliente.findUnique(args);
    }

    async update(updateClientArgs: Prisma.ClienteUpdateArgs) {
        try {
            const updatedClient = await this.db.cliente.update(updateClientArgs);
            return updatedClient;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException('Cliente não encontrado.');
                }
            }

            throw error;
        }
    }

    async remove(id: string) {
        try {
            await this.db.cliente.delete({
                where: { id },
            });

            return { message: 'Cliente deletado com sucesso.' };
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException('Cliente não encontrado para exclusão.');
            }

            throw error;
        }
    }
}
