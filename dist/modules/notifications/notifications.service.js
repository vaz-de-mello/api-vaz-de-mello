"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const library_1 = require("@prisma/client/runtime/library");
const database_service_1 = require("../database/database.service");
const notifications_gateway_1 = require("../../shared/gateways/notifications.gateway");
let NotificationsService = class NotificationsService {
    constructor(db, gateway) {
        this.db = db;
        this.gateway = gateway;
    }
    async create(createNotificationDto) {
        try {
            const notification = await this.db.notificacao.create(createNotificationDto);
            this.gateway.sendNotification(createNotificationDto.data.usuario_id, createNotificationDto.data.mensagem);
            return notification;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                switch (error.code) {
                    case 'P2009':
                        throw new common_1.BadRequestException({
                            message: 'Dados inválidos enviados para o banco.',
                            success: false,
                            statusCode: 400,
                            error: 'BadRequest',
                        });
                    default:
                        throw new common_1.InternalServerErrorException({
                            message: 'Erro interno ao criar conversa.',
                            success: false,
                            statusCode: 500,
                            error: 'InternalServerError',
                        }, error.toString());
                }
            }
            console.log(error);
            throw new common_1.InternalServerErrorException({
                message: 'Erro interno do servidor.',
                success: false,
                statusCode: 500,
                error: 'InternalServerError',
            }, error.toString());
        }
    }
    findByUser(usuario_id) {
        return this.db.notificacao.findMany({
            where: { usuario_id },
            orderBy: { created_at: 'desc' },
        });
    }
    async update(updateNotificacaotionDto) {
        try {
            const updatedConversation = await this.db.notificacao.update(updateNotificacaotionDto);
            return updatedConversation;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException({
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
    async delete(id) {
        try {
            await this.db.notificacao.delete({
                where: { id },
            });
            return { message: 'Notificação deletada com sucesso.' };
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new common_1.NotFoundException({
                    message: 'Notificação não encontrada para exclusão.',
                    success: false,
                    statusCode: 404,
                    error: 'NotFound',
                });
            }
            throw error;
        }
    }
    async deleteByUser(usuario_id) {
        try {
            await this.db.notificacao.deleteMany({
                where: { usuario_id },
            });
            return { message: 'Notificações do usuário deletadas com sucesso.' };
        }
        catch (error) {
            throw error;
        }
    }
};
NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        notifications_gateway_1.NotificationsGateway])
], NotificationsService);
exports.NotificationsService = NotificationsService;
//# sourceMappingURL=notifications.service.js.map