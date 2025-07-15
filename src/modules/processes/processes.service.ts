import {
    BadRequestException,
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { DatabaseService } from '../database/database.service';
import { PageDto } from 'src/shared/@types';
import { ProcessEntity } from './entities';


@Injectable()
export class ProcessesService {
    constructor(
        private readonly db: DatabaseService,
    ) { }

    async create(createProcessArgs: Prisma.ProcessoCreateArgs) {
        try {
            const process = await this.db.processo.create(createProcessArgs);
            return process;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                switch (error.code) {
                    case 'P2002':
                        // Violação de campo único
                        const fields = (error.meta?.target as string[])?.join(', ') || 'campos únicos';
                        throw new ConflictException(`Já existe um processo com os seguintes dados duplicados: ${fields}.`);

                    case 'P2003':
                        // Chave estrangeira inválida
                        throw new BadRequestException('Chave estrangeira inválida: um dos IDs fornecidos não existe.');

                    case 'P2009':
                        // Dados inválidos enviados
                        throw new BadRequestException('Dados inválidos enviados para o banco.');

                    default:
                        throw new InternalServerErrorException('Erro desconhecido ao criar processo.');
                }
            }

            // Erros fora do Prisma
            console.log(error);
            throw new InternalServerErrorException('Erro interno no servidor.', error.toString());
        }
    }

    async findAll(query: Partial<ProcessEntity>, page: PageDto) {
        return this.db.$transaction([
            this.db.processo.count({ where: query }),
            this.db.processo.findMany({
                where: query,
                ...page,
                orderBy: { createdAt: 'desc' },
                include: {
                    cliente: true,
                    escritorio: true,
                }
            })
        ])
    }

    async findFirst(args: Prisma.ProcessoFindFirstArgs) {
        return this.db.processo.findFirst(args);

    }

    async findUnique(args: Prisma.ProcessoFindUniqueArgs) {
        return this.db.processo.findUnique(args);
    }

    async update(updateProcessArgs: Prisma.ProcessoUpdateArgs) {
        try {
            const updatedProcess = await this.db.processo.update(updateProcessArgs);
            return updatedProcess;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException('Processo não encontrado.');
                }
            }

            throw error;
        }
    }

    async remove(id: string) {
        try {
            await this.db.processo.delete({
                where: { id },
            });

            return { message: 'Processo deletado com sucesso.' };
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException('Processo não encontrado para exclusão.');
            }

            throw error;
        }
    }
}
