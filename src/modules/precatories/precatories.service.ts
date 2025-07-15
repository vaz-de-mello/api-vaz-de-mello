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
                        throw new ConflictException(`Já existe um precatório com os seguintes dados duplicados: ${fields}.`);

                    case 'P2003':
                        // Chave estrangeira inválida
                        throw new BadRequestException('Chave estrangeira inválida: um dos IDs fornecidos não existe.');

                    case 'P2009':
                        // Dados inválidos enviados
                        throw new BadRequestException('Dados inválidos enviados para o banco.');

                    default:
                        throw new InternalServerErrorException('Erro desconhecido ao criar precatório.');
                }
            }

            // Erros fora do Prisma
            console.log(error);
            throw new InternalServerErrorException('Erro interno no servidor.', error.toString());
        }
    }

    async findAll(query: Partial<PrecatoryEntity>, page: PageDto) {
        return this.db.$transaction([
            this.db.precatorio.count({ where: query }),
            this.db.precatorio.findMany({
                where: query,
                ...page,
                orderBy: { createdAt: 'desc' },
                include: {
                    cliente: true,
                }
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
                    throw new NotFoundException('Precatório não encontrado.');
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
                throw new NotFoundException('Precatório não encontrado para exclusão.');
            }

            throw error;
        }
    }
}
