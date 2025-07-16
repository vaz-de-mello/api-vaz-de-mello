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
                        throw new ConflictException({
                            message: `Já existe um processo com o(s) seguinte(s) dado(s) duplicado(s): ${fields}.`,
                            success: false,
                            statusCode: 409,
                            error: 'Conflict',
                        });

                    case 'P2003':
                        // Chave estrangeira inválida
                        throw new BadRequestException({
                            message: 'Chave estrangeira inválida: um dos IDs fornecidos não existe.',
                            success: false,
                            statusCode: 400,
                            error: 'BadRequest',
                        });

                    case 'P2009':
                        // Dados inválidos enviados
                        throw new BadRequestException({
                            message: 'Dados inválidos enviados para o banco.',
                            success: false,
                            statusCode: 400,
                            error: 'BadRequest',
                        });

                    default:
                        throw new InternalServerErrorException({
                            message: 'Erro desconhecido ao criar processo.',
                            success: false,
                            statusCode: 500,
                            error: 'InternalServerError',
                        }, error.toString());
                }
            }

            // Erros fora do Prisma
            console.log(error);
            throw new InternalServerErrorException({
                message: 'Erro interno do servidor.',
                success: false,
                statusCode: 500,
                error: 'InternalServerError',
            }, error.toString());
        }
    }

    async findAll(query: Partial<ProcessEntity>, page: PageDto) {
        return this.db.$transaction([
            this.db.processo.count({ where: query }),
            this.db.processo.findMany({
                where: query,
                ...page,
                orderBy: { createdAt: 'desc' },
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
                    throw new NotFoundException({
                        message: 'Processo não encontrado para atualização.',
                        success: false,
                        statusCode: 404,
                        error: 'NotFound',
                    });
                }
            }

            throw error;
        }
    }

    async delete(id: string) {
        try {
            await this.db.processo.delete({
                where: { id },
            });

            return { message: 'Processo deletado com sucesso.' };
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException({
                    message: 'Processo não encontrado para exclusão.',
                    success: false,
                    statusCode: 404,
                    error: 'NotFound',
                });
            }

            throw error;
        }
    }
}
