import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';

import { NotificationsService } from './notifications.service';

import { Ok } from 'src/shared/responses';
import { User } from 'src/shared/decorators';

import { CreateNotificationDto } from './dto/create-notification.dto';
import { UserWithoutPassword } from '../users/entities';

@Controller('notifications')
export class NotificationsController {
    constructor(
        private readonly notificationsService: NotificationsService,
    ) { }

    @Post()
    async create(@Body() createNotificationDto: CreateNotificationDto) {
        const notification = await this.notificationsService.create({
            data: createNotificationDto,
        });

        return new Ok({ data: notification, message: 'Notificação criada com sucesso.' });
    }

    @Get()
    async findByUser(
        @User() user: UserWithoutPassword,
    ) {
        const notifications = await this.notificationsService.findByUser(user.id);
        return new Ok({ data: notifications, message: 'Notificações encontradas com sucesso.' });
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        const { message } = await this.notificationsService.delete(id);
        return new Ok({ message });
    }

    @Delete('all')
    async deleteByUser(
        @User() user: UserWithoutPassword,
    ) {
        const { message } = await this.notificationsService.deleteByUser(user.id);
        return new Ok({ message });
    }
}
