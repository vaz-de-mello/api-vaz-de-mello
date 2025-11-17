import { NotificationsService } from './notifications.service';
import { Ok } from 'src/shared/responses';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UserWithoutPassword } from '../users/entities';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    create(createNotificationDto: CreateNotificationDto): Promise<Ok>;
    findByUser(user: UserWithoutPassword): Promise<Ok>;
    delete(id: string): Promise<Ok>;
    deleteByUser(user: UserWithoutPassword): Promise<Ok>;
}
