import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    NotFoundException,
} from '@nestjs/common';

import { ClientsService } from './clients.service';

import { Ok } from 'src/shared/responses';
import { PageQueryDto } from 'src/shared/@types';
import { PageQuery } from 'src/shared/decorators';
import { createPaginatedResponse } from 'src/shared/utils';

import { ClientEntity } from './entities';
import { CreateClientDto, UpdateClientDto } from './dto';
import { Sexo } from '@prisma/client';

@Controller('clients')
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) { }

    @Post()
    async create(
        @Body() createClientDto: CreateClientDto
    ) {
        const client = await this.clientsService.create({
            data: createClientDto,
        });
        return client;
    }

    @Get()
    async findAll(
        @PageQuery({
            caseSensitive: ['nome'],
            equals: ['cpf', 'id'],
            enumValidator: [
                { key: 'sexo', enum: Sexo },
            ]
        }) { page, query }: PageQueryDto<Partial<ClientEntity>>
    ) {
        const [total, clients] = await this.clientsService.findAll(query, page);
        const response = createPaginatedResponse({
            data: clients,
            total,
            page,
        })

        return new Ok(response);
    }

    @Get(':id')
    async findOne(
        @Param('id') id: string,
    ) {
        const client = await this.clientsService.findUnique({ where: { id } });
        if (!client) throw new NotFoundException('Cliente não encontrado.');

        return new Ok({ data: client, message: 'Cliente encontrado com sucesso.' });
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateClientDto: UpdateClientDto
    ) {
        const client = await this.clientsService.update({
            where: { id },
            data: updateClientDto,
        });

        return new Ok({ data: client, message: 'Cliente atualizado com sucesso.' });
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const { message } = await this.clientsService.remove(id);
        return new Ok({ message });
    }
}
