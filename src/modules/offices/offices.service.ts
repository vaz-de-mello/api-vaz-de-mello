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

import { OfficeEntity } from './entities';
import { PageDto } from 'src/shared/@types';

@Injectable()
export class OfficesService {
    constructor(
        private readonly db: DatabaseService,
    ) { }

    async create(createOfficeDto: Prisma.EscritorioCreateArgs) {
        try {
            const office = await this.db.escritorio.create(createOfficeDto);
            return office;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                switch (error.code) {
                    case 'P2002':
                        // Violação de campo único
                        const fields = (error.meta?.target as string[])?.join(', ') || 'campos únicos';
                        throw new ConflictException({
                            message: `Já existe um escritório com o(s) seguinte(s) dado(s) duplicado(s): ${fields}.`,
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
                            message: 'Erro interno ao criar escritório.',
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

    async findAll(query: Partial<OfficeEntity>, page: PageDto) {
        return this.db.$transaction([
            this.db.escritorio.count({ where: query }),
            this.db.escritorio.findMany({
                where: query,
                ...page,
                orderBy: { createdAt: 'desc' },
            })
        ])
    }

    async findUnique(args: Prisma.EscritorioFindUniqueArgs) {
        return this.db.escritorio.findUnique(args);
    }

    async findFirst(args: Prisma.EscritorioFindFirstArgs) {
        return this.db.escritorio.findFirst(args);
    }

    async findOne(id: string) {
        return this.db.escritorio.findUnique({
            where: { id },
        });
    }

    async update(updateOfficeDto: Prisma.EscritorioUpdateArgs) {
        try {
            const updatedEscritorio = await this.db.escritorio.update(updateOfficeDto);
            return updatedEscritorio;
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
            await this.db.escritorio.delete({
                where: { id },
            });

            return { message: 'Escritório deletado com sucesso.' };
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException({
                    message: 'Escritório não encontrado para exclusão.',
                    success: false,
                    statusCode: 404,
                    error: 'NotFound',
                });
            }

            throw error;
        }
    }
}
