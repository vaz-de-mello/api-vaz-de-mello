import {
    BadRequestException,
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { DatabaseService } from '../database/database.service';

import { PrecatoryEntity } from './entities';
import { PageDto } from 'src/shared/@types';

@Injectable()
export class PrecatoriesService {
    constructor(
        private readonly db: DatabaseService,
    ) { }

    cardNumberGenerator(contador: number) {
        const d = new Date();
        const day = (d.getDate() < 10) ? `0${d.getDate()}` : d.getDate();
        const mon = (d.getMonth() + 1 < 10) ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
        return `${day}${mon}${d.getFullYear()}${contador}`;
    }

    async create(createArgs: Prisma.PrecatorioCreateArgs) {
        try {
            const precatory = await this.db.precatorio.create(createArgs);
            return precatory;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                switch (error.code) {
                    case 'P2002':
                        // Violação de campo único
                        const fields = (error.meta?.target as string[])?.join(', ') || 'campos únicos';
                        throw new ConflictException({
                            message: `Já existe um precatório com o(s) seguinte(s) dado(s) duplicado(s): ${fields}.`,
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
                            message: 'Erro desconhecido ao criar precatório.',
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

    async findAll(query: Partial<PrecatoryEntity>, page: PageDto) {
        return this.db.$transaction([
            this.db.precatorio.count({ where: query }),
            this.db.precatorio.findMany({
                where: query,
                ...page,
                orderBy: { createdAt: 'desc' },
                include: { cliente: true, escritorio: true },
            })
        ])
    }

    async findFirst(args: Prisma.PrecatorioFindFirstArgs) {
        return this.db.precatorio.findFirst(args);
    }

    async findUnique(args: Prisma.PrecatorioFindUniqueArgs) {
        return this.db.precatorio.findUnique(args);
    }

    async update(updatePrecatorioDto: Prisma.PrecatorioUpdateArgs) {
        try {
            const updatedPrecatory = await this.db.precatorio.update(updatePrecatorioDto);
            return updatedPrecatory;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException({
                        message: 'Precatório não encontrado para atualização.',
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
            await this.db.precatorio.delete({
                where: { id },
            });

            return { message: 'Precatório deletado com sucesso.' };

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException({
                    message: 'Precatório não encontrado para exclusão.',
                    success: false,
                    statusCode: 404,
                    error: 'NotFound',
                });
            }

            throw error;
        }
    }
}
