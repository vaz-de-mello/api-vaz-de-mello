import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { NotificationsGateway } from 'src/shared/gateways/notifications.gateway';
export declare class NotificationsService {
    private readonly db;
    private readonly gateway;
    constructor(db: DatabaseService, gateway: NotificationsGateway);
    create(createNotificationDto: Prisma.NotificacaoCreateArgs): Promise<{
        id: string;
        usuario_id: string;
        mensagem: string;
        goTo: string;
    }>;
    findByUser(usuario_id: string): Prisma.PrismaPromise<{
        id: string;
        usuario_id: string;
        mensagem: string;
        goTo: string;
    }[]>;
    update(updateNotificacaotionDto: Prisma.NotificacaoUpdateArgs): Promise<{
        id: string;
        usuario_id: string;
        mensagem: string;
        goTo: string;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
    deleteByUser(usuario_id: string): Promise<{
        message: string;
    }>;
}
