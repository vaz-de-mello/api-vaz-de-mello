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

import { RestituitionEntity } from './entities';

@Injectable()
export class RestitutionService {
    constructor(
        private readonly db: DatabaseService,
    ) { }

    async create(createArgs: Prisma.RestituicaoCreateArgs) {
        try {
            const restituicao = await this.db.restituicao.create(createArgs);
            return restituicao;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                switch (error.code) {
                    case 'P2002':
                        // Violação de campo único
                        const fields = (error.meta?.target as string[])?.join(', ') || 'campos únicos';
                        throw new ConflictException({
                            message: `Já existe uma restituição com o(s) seguinte(s) dado(s) duplicado(s): ${fields}.`,
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
                            message: 'Erro desconhecido ao criar restituição.',
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

    async findAll(query: Partial<RestituitionEntity>, page: PageDto) {
        return this.db.$transaction([
            this.db.restituicao.count({ where: query }),
            this.db.restituicao.findMany({
                where: query,
                ...page,
                orderBy: { createdAt: 'desc' },
            })
        ])
    }

    async findFirst(args: Prisma.RestituicaoFindFirstArgs) {
        return this.db.restituicao.findFirst(args);

    }

    async findUnique(args: Prisma.RestituicaoFindUniqueArgs) {
        return this.db.restituicao.findUnique(args);
    }

    async update(updateArgs: Prisma.RestituicaoUpdateArgs) {
        try {
            const updatedUsuario = await this.db.restituicao.update(updateArgs);
            return updatedUsuario;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException({
                        message: 'Restituição não encontrada para atualização.',
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
            await this.db.restituicao.delete({
                where: { id },
            });

            return { message: 'Restituição deletada com sucesso.' };

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException({
                    message: 'Restituição não encontrada para exclusão.',
                    success: false,
                    statusCode: 404,
                    error: 'NotFound',
                });
            }

            throw error;
        }
    }
}
