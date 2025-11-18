import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { DatabaseService } from '../database/database.service';
import { NotificationsGateway } from 'src/shared/gateways/notifications.gateway';

@Injectable()
export class NotificationsService {
    constructor(
        private readonly db: DatabaseService,
        private readonly gateway: NotificationsGateway,
    ) { }

    async create(createNotificationDto: Prisma.NotificacaoCreateArgs) {
        try {
            const notification = await this.db.notificacao.create(createNotificationDto);

            this.gateway.sendNotification(
                createNotificationDto.data.usuario_id,
                notification,
            );

            return notification;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                switch (error.code) {
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

    findByUser(usuario_id: string) {
        return this.db.notificacao.findMany({
            where: { usuario_id },
            orderBy: { created_at: 'desc' },
        });
    }

    async update(updateNotificacaotionDto: Prisma.NotificacaoUpdateArgs) {
        try {
            const updatedConversation = await this.db.notificacao.update(updateNotificacaotionDto);
            return updatedConversation;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException({
                        message: 'Notificação não encontrada para atualização.',
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
            await this.db.notificacao.delete({
                where: { id },
            });

            return { message: 'Notificação deletada com sucesso.' };
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException({
                    message: 'Notificação não encontrada para exclusão.',
                    success: false,
                    statusCode: 404,
                    error: 'NotFound',
                });
            }

            throw error;
        }
    }

    async deleteByUser(usuario_id: string) {
        try {
            await this.db.notificacao.deleteMany({
                where: { usuario_id },
            });

            return { message: 'Notificações do usuário deletadas com sucesso.' };
        } catch (error) {
            throw error;
        }
    }
}
