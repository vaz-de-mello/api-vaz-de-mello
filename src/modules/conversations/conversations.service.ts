import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ConversationsService {
    constructor(
        private readonly db: DatabaseService,
    ) { }

    async create(createConversationDto: Prisma.ConversaCreateArgs) {
        try {
            return this.db.conversa.create(createConversationDto);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                switch (error.code) {
                    case 'P2002':
                        // Violação de campo único
                        const fields = (error.meta?.target as string[])?.join(', ') || 'campos únicos';
                        throw new ConflictException({
                            message: `Já existe uma conversa com o(s) seguinte(s) dado(s) duplicado(s): ${fields}.`,
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
                            message: 'Erro interno ao criar conversa.',
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

    async findByPrecatory(precatorio_id: string) {
        return this.db.conversa.findMany({
            where: { precatorio_id },
        })
    }

    async update(updateConversationDto: Prisma.ConversaUpdateArgs) {
        try {
            const updatedConversation = await this.db.conversa.update(updateConversationDto);
            return updatedConversation;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException({
                        message: 'Conversa não encontrada para atualização.',
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
            await this.db.conversa.delete({
                where: { id },
            });

            return { message: 'Conversa deletada com sucesso.' };
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException({
                    message: 'Conversa não encontrada para exclusão.',
                    success: false,
                    statusCode: 404,
                    error: 'NotFound',
                });
            }

            throw error;
        }
    }
}
