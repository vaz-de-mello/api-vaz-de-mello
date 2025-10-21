import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';

import { ConversationsService } from './conversations.service';
import { User } from 'src/shared/decorators';
import { UserWithoutPassword } from '../users/entities';

import { CreateConversationDto, UpdateConversationDto } from './dto';
import { Ok } from 'src/shared/responses';

@Controller('conversations')
export class ConversationsController {
    constructor(private readonly conversationsService: ConversationsService) { }

    @Post()
    async create(
        @Body() createConversationDto: CreateConversationDto,
        @User() user: UserWithoutPassword,
    ) {
        const conversation = await this.conversationsService.create({
            data: {
                ...createConversationDto,
                usuario_nome: user.nome,
                usuario_id: user.id,
            }
        });
        return new Ok({ data: conversation, message: 'Conversa criada com sucesso.' });
    }

    @Get('precatory/:id')
    async findByPrecatory(@Param('id') precatory_id: string) {
        const conversations = await this.conversationsService.findByPrecatory(precatory_id);
        return new Ok({ data: conversations, message: 'Conversas encontradas com sucesso.' });
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateConversationDto: UpdateConversationDto) {
        const conversation = await this.conversationsService.update({
            data: updateConversationDto,
            where: { id },
        });

        return new Ok({ data: conversation, message: 'Conversa atualizada com sucesso.' });
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const { message } = await this.conversationsService.delete(id);
        return new Ok({ message });
    }
}
