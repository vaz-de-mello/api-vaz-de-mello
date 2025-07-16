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
import { TeseAplicada } from '@prisma/client';

import { RestitutionService } from './restituition.service';

import { Ok } from 'src/shared/responses';
import { PageQueryDto } from 'src/shared/@types';
import { PageQuery } from 'src/shared/decorators';
import { createPaginatedResponse } from 'src/shared/utils';

import { UpdateRestituitionDto, CreateRestituitionDto } from './dto';
import { RestituitionEntity } from './entities';

@Controller('restituition')
export class RestitutionController {
    constructor(private readonly restituitionService: RestitutionService) { }

    @Post()
    async create(@Body() createRestitutionDto: CreateRestituitionDto) {
        const restituition = await this.restituitionService.create({
            data: createRestitutionDto,
        });

        return new Ok({
            data: restituition,
            message: 'Restituição criada com sucesso.',
        })
    }

    @Get()
    async findAll(
        @PageQuery({
            equals: ['id', 'tese_aplicada', 'necessita_calculo_judicial', 'status'],
            enumValidator: [
                { key: 'tese_aplicada', enum: TeseAplicada },
            ]
        }) { page, query }: PageQueryDto<Partial<RestituitionEntity>>
    ) {
        const [total, restituitions] = await this.restituitionService.findAll(query, page);
        const response = createPaginatedResponse({
            data: restituitions,
            total,
            page,
        })

        return new Ok(response);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const restituition = await this.restituitionService.findUnique({ where: { id } });
        if (!restituition) throw new NotFoundException({
            message: 'Restituição não encontrada.',
            success: false,
            statusCode: 404,
            error: 'NotFound',
        });

        return new Ok({
            data: restituition,
            message: 'Restituição encontrada com sucesso.',
        });
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateRestitutionDto: UpdateRestituitionDto
    ) {
        const restituition = await this.restituitionService.update({
            where: { id },
            data: updateRestitutionDto,
        });

        return new Ok({
            data: restituition,
            message: 'Restituição atualizada com sucesso.',
        });
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        const { message } = await this.restituitionService.delete(id);
        return new Ok({
            message,
        });
    }
}
