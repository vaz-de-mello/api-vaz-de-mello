import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';

import { PendingsService } from './pendings.service';

import { PageQuery, User } from 'src/shared/decorators';
import { Ok } from 'src/shared/responses';
import { createPaginatedResponse } from 'src/shared/utils';
import { PageQueryDto } from 'src/shared/@types';

import { PendingsEntity } from './entities';
import { UserWithoutPassword } from '../users/entities';
import { CreatePendingDto, UpdatePendingDto } from './dto';

@Controller('pendings')
export class PendingsController {
    constructor(private readonly pendingsService: PendingsService) { }

    @Post()
    async create(
        @Body() createPendingDto: CreatePendingDto,
        @User() user: UserWithoutPassword,
    ) {
        const pending = await this.pendingsService.create({
            data: {
                ...createPendingDto,
                status: 0,
                escritorio_id: user.escritorio_id,
            }
        });

        return new Ok({ data: pending, message: 'Pendência criada com sucesso.' })
    }

    @Get()
    async findAll(
        @PageQuery({
            caseSensitive: ['nome_fantasia', 'responsaveis_legais'],
            equals: ['cnpj', 'id'],
        }) { page, query }: PageQueryDto<Partial<PendingsEntity>>,
        @User() user: UserWithoutPassword,
    ) {
        query.escritorio_id = user.escritorio_id;

        const [total, pendings] = await this.pendingsService.findAll(query, page);

        const response = createPaginatedResponse({
            data: pendings,
            total,
            page,
        })

        return new Ok(response);
    }

    @Get('precatory/:id')
    async findByPrecatory(
        @Param('id') id: string,
    ) {
        const data = await this.pendingsService.findByPrecatory(id);
        return new Ok({ data, message: 'Pendências encontradas com sucesso.' });
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const data = await this.pendingsService.findOne(id);
        return new Ok({ data, message: 'Pendência encontradas com sucesso.' });
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updatePendingDto: UpdatePendingDto
    ) {
        const data = await this.pendingsService.update({
            data: updatePendingDto,
            where: { id },
        });

        return new Ok({ data, message: 'Pendência atualizada com sucesso.' });
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const { message } = await this.pendingsService.delete(id);
        return new Ok({ message });
    }
}
