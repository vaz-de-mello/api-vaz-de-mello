import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePrecatorioDto } from './dto/create-precatorio.dto';
import { UpdatePrecatorioDto } from './dto/update-precatorio.dto';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class PrecatoriosService {
    constructor(
        private readonly db: DatabaseService,
    ) { }

    async create(createArgs: Prisma.PrecatorioCreateArgs) {
        try {
            const precatorio = await this.db.precatorio.create(createArgs);

            return precatorio;
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

    async findAll() {
        return `This action returns all precatorios`;
    }

    async findOne(id: number) {
        return `This action returns a #${id} precatorio`;
    }

    async update(id: number, updatePrecatorioDto: UpdatePrecatorioDto) {
        return `This action updates a #${id} precatorio`;
    }

    async remove(id: number) {
        return `This action removes a #${id} precatorio`;
    }
}
