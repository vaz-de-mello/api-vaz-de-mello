import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { NotificationsGateway } from 'src/shared/gateways/notifications.gateway';

@Module({
    controllers: [NotificationsController],
    providers: [
        NotificationsGateway,
        NotificationsService,
    ],
})
export class NotificationsModule { }
