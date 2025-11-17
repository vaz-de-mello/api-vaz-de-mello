import { ConversationsService } from './conversations.service';
import { UserWithoutPassword } from '../users/entities';
import { CreateConversationDto, UpdateConversationDto } from './dto';
import { Ok } from 'src/shared/responses';
export declare class ConversationsController {
    private readonly conversationsService;
    constructor(conversationsService: ConversationsService);
    create(createConversationDto: CreateConversationDto, user: UserWithoutPassword): Promise<Ok>;
    findByPrecatory(precatory_id: string): Promise<Ok>;
    update(id: string, updateConversationDto: UpdateConversationDto): Promise<Ok>;
    remove(id: string): Promise<Ok>;
}
