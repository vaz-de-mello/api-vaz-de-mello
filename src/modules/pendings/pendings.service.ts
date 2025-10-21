import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

import { DatabaseService } from '../database/database.service';

import { FindAllPendings, UpdatePendingDto } from './dto';
import { PageDto } from 'src/shared/@types';
import { PendingsEntity } from './entities';

@Injectable()
export class PendingsService {
    constructor(
        private readonly db: DatabaseService,
    ) { }

    async create(createPendingDto: Prisma.PendenciaCreateArgs) {
        try {
            return this.db.pendencia.create(createPendingDto);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                switch (error.code) {
                    case 'P2002':
                        // Violação de campo único
                        const fields = (error.meta?.target as string[])?.join(', ') || 'campos únicos';
                        throw new ConflictException({
                            message: `Já existe uma pendência com o(s) seguinte(s) dado(s) duplicado(s): ${fields}.`,
                            success: false,
                            statusCode: 409,
                            error: 'Conflict',
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
                            message: 'Erro interno ao criar pendência.',
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

    findAll(query: Partial<PendingsEntity>, page: PageDto) {
        return this.db.$transaction([
            this.db.pendencia.count({ where: query }),
            this.db.pendencia.findMany({
                where: query,
                ...page,
                orderBy: { createdAt: 'desc' },
            })
        ])
    }

    async findByPrecatory(precatorio_id: string) {
        return this.db.pendencia.findMany({
            where: { precatorio_id },
        });
    }

    async findOne(id: string) {
        return this.db.pendencia.findUnique({
            where: { id },
        });
    }

    async update(updatePendingDto: Prisma.PendenciaUpdateArgs) {
        try {
            const updatedPending = await this.db.pendencia.update(updatePendingDto);
            return updatedPending;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException({
                        message: 'Escritório não encontrado para atualização.',
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
            await this.db.pendencia.delete({
                where: { id },
            });

            return { message: 'Pendência deletada com sucesso.' };
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException({
                    message: 'Pendência não encontrada para exclusão.',
                    success: false,
                    statusCode: 404,
                    error: 'NotFound',
                });
            }

            throw error;
        }
    }
}
