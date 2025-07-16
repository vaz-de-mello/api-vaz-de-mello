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
import { DocumentEntity } from './entities';
import { PageDto } from 'src/shared/@types';


@Injectable()
export class DocumentsService {
    constructor(private readonly db: DatabaseService) { }

    async create(createArgs: Prisma.DocumentoCreateArgs) {
        try {
            const document = await this.db.documento.create(createArgs);
            return document;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                switch (error.code) {
                    case 'P2002':
                        // Violação de campo único
                        const fields = (error.meta?.target as string[])?.join(', ') || 'campos únicos';
                        throw new ConflictException({
                            message: `Já existe um documento com o(s) seguinte(s) dado(s) duplicado(s): ${fields}.`,
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

    async findAll(query: Partial<DocumentEntity>, page: PageDto) {
        return this.db.$transaction([
            this.db.documento.count({ where: query }),
            this.db.documento.findMany({
                where: query,
                ...page,
                orderBy: { createdAt: 'desc' },
                include: {
                    cliente: true,
                }
            })
        ])
    }

    async findFirst(args: Prisma.DocumentoFindFirstArgs) {
        return this.db.documento.findFirst(args);
    }

    async findUnique(args: Prisma.DocumentoFindUniqueArgs) {
        return this.db.documento.findUnique(args);
    }

    async update(updateDocumentArgs: Prisma.DocumentoUpdateArgs) {
        try {
            const updatedDocument = await this.db.documento.update(updateDocumentArgs);
            return updatedDocument;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException({
                        message: 'Documento não encontrado para atualização.',
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
            await this.db.documento.delete({
                where: { id },
            });

            return { message: 'Documento deletado com sucesso.' };

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException({
                    message: 'Documento não encontrado para exclusão.',
                    success: false,
                    statusCode: 404,
                    error: 'NotFound',
                });
            }

            throw error;
        }
    }
}
