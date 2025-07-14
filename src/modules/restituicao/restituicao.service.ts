import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRestituicaoDto } from './dto/create-restituicao.dto';
import { UpdateRestituicaoDto } from './dto/update-restituicao.dto';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { DatabaseService } from '../database/database.service';
import { RestituicaoEntity } from './entities';
import { PageDto } from 'src/shared/@types';

@Injectable()
export class RestituicaoService {
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
                        throw new ConflictException(`Já existe uma restituição com os seguintes dados duplicados: ${fields}.`);

                    case 'P2003':
                        // Chave estrangeira inválida
                        throw new BadRequestException('Chave estrangeira inválida: um dos IDs fornecidos não existe.');

                    case 'P2009':
                        // Dados inválidos enviados
                        throw new BadRequestException('Dados inválidos enviados para o banco.');

                    default:
                        throw new InternalServerErrorException('Erro desconhecido ao criar restituição.');
                }
            }

            // Erros fora do Prisma
            console.log(error);
            throw new InternalServerErrorException('Erro interno no servidor.', error.toString());
        }
    }

    async findAll(query: Partial<RestituicaoEntity>, page: PageDto) {
        return this.db.$transaction([
            this.db.restituicao.count({ where: query }),
            this.db.restituicao.findMany({
                where: query,
                ...page,
                orderBy: { createdAt: 'desc' },
                include: {
                    precatorio: true,
                }
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
                    throw new NotFoundException('Restituição não encontrada.');
                }
            }

            throw error;
        }
    }

    async remove(id: string) {
        try {
            await this.db.restituicao.delete({
                where: { id },
            });

            return { message: 'Restituição deletada com sucesso.' };

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException('Restituição não encontrada para exclusão.');
            }

            throw error;
        }
    }
}
