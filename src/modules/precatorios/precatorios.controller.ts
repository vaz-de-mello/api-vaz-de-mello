import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    BadRequestException,
    NotFoundException,
} from '@nestjs/common';

import { PrecatoriosService } from './precatorios.service';

import { Ok } from 'src/shared/responses';
import { PageQuery } from 'src/shared/decorators';
import { PageQueryDto } from 'src/shared/@types';
import { createPaginatedResponse } from 'src/shared/utils';

import { CreatePrecatorioDto, UpdatePrecatorioDto } from './dto';
import { PrecatorioEntity } from './entities';

@Controller('precatorios')
export class PrecatoriosController {
    constructor(private readonly precatoriosService: PrecatoriosService) { }

    @Post()
    async create(
        @Body() createPrecatorioDto: CreatePrecatorioDto
    ) {
        if (!createPrecatorioDto.escritorio_id && !createPrecatorioDto.usuario_id)
            throw new BadRequestException('`escritorio_id` ou `usuario_id` deve ser informado. Ambos estão vazios.');

        if (createPrecatorioDto.escritorio_id && createPrecatorioDto.usuario_id)
            throw new BadRequestException('`escritorio_id` ou `usuario_id` deve estar nulo. Ambos estão preenchidos.');

        const data = await this.precatoriosService.create({
            data: {
                ...createPrecatorioDto,
            },
        });

        return new Ok({ data, message: 'Precatório criado com sucesso.' });
    }

    @Get()
    async findAll(
        @PageQuery() { page, query }: PageQueryDto<Partial<PrecatorioEntity>>
    ) {
        const [total, data] = await this.precatoriosService.findAll(query, page);
        const response = createPaginatedResponse({
            data,
            total,
            page,
        })

        return new Ok(response);
    }

    @Get(':id')
    async findOne(
        @Param('id') id: string
    ) {
        const data = await this.precatoriosService.findUnique({ where: { id } });
        if (!data) {
            throw new NotFoundException('Precatório não encontrado.');
        }

        return new Ok({ data, message: 'Precatório encontrado com sucesso.' });
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updatePrecatorioDto: UpdatePrecatorioDto
    ) {
        const data = await this.precatoriosService.update({
            where: { id },
            data: updatePrecatorioDto,
        });

        return new Ok({ data, message: 'Precatório atualizado com sucesso.' });
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const response = await this.precatoriosService.delete(id);
        return new Ok(response);
    }
}
