import { Injectable, NotFoundException } from '@nestjs/common';
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
        return this.db.escritorio.create(createOfficeDto);
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
                    throw new NotFoundException('Escritório não encontrado.');
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
                throw new NotFoundException('Escritório não encontrado para exclusão.');
            }

            throw error;
        }
    }
}
