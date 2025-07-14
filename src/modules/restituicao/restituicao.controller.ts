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
import { RestituicaoService } from './restituicao.service';

import { Ok } from 'src/shared/responses';
import { PageQueryDto } from 'src/shared/@types';
import { PageQuery } from 'src/shared/decorators';
import { createPaginatedResponse } from 'src/shared/utils';

import { UpdateRestituicaoDto, CreateRestituicaoDto } from './dto';
import { RestituicaoEntity } from './entities';

@Controller('restituicao')
export class RestituicaoController {
    constructor(private readonly restituicaoService: RestituicaoService) { }

    @Post()
    async create(@Body() createRestituicaoDto: CreateRestituicaoDto) {
        const restituicao = await this.restituicaoService.create({
            data: createRestituicaoDto,
        });

        return new Ok({
            data: restituicao,
            message: 'Restituição criada com sucesso.',
        })
    }

    @Get()
    async findAll(
        @PageQuery({
            // caseSensitive: ['tribunal_pagador'],
            // equals: ['id', 'escritorio_id', 'usuario_id', 'cliente_id'],
        }) { page, query }: PageQueryDto<Partial<RestituicaoEntity>>
    ) {
        const [total, restituitions] = await this.restituicaoService.findAll(query, page);
        const response = createPaginatedResponse({
            data: restituitions,
            total,
            page,
        })

        return new Ok(response);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const restituition = await this.restituicaoService.findUnique({ where: { id } });
        if (!restituition) throw new NotFoundException('Restituição não encontrada.');

        return new Ok({
            data: restituition,
            message: 'Restituição encontrada com sucesso.',
        });
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateRestituicaoDto: UpdateRestituicaoDto
    ) {
        const restituition = await this.restituicaoService.update({
            where: { id },
            data: updateRestituicaoDto,
        });

        return new Ok({
            data: restituition,
            message: 'Restituição atualizada com sucesso.',
        });
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const { message } = await this.restituicaoService.remove(id);
        return new Ok({
            message,
        });
    }
}
