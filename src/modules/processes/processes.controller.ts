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

import { ProcessesService } from './processes.service';

import { Ok } from 'src/shared/responses';
import { PageQueryDto } from 'src/shared/@types';
import { PageQuery } from 'src/shared/decorators';
import { createPaginatedResponse } from 'src/shared/utils';

import { ProcessEntity } from './entities';
import {
    CreateProcessDto,
    UpdateProcessDto,
} from './dto';
import { PlataformaDistribuicao } from '@prisma/client';

@Controller('processes')
export class ProcessesController {
    constructor(private readonly processesService: ProcessesService) { }

    @Post()
    async create(@Body() createProcessDto: CreateProcessDto) {
        const process = await this.processesService.create({
            data: createProcessDto,
        });

        return new Ok({ data: process, message: 'Processo criado com sucesso.' });
    }

    @Get()
    async findAll(
        @PageQuery({
            caseSensitive: ['vara_juizo'],
            equals: ['id', 'escritorio_id', 'cliente_id', 'plataforma_distribuicao'],
            enumValidator: [
                {
                    key: 'plataforma_distribuicao',
                    enum: PlataformaDistribuicao,
                },
            ]
        }) { page, query }: PageQueryDto<Partial<ProcessEntity>>
    ) {
        const [total, processes] = await this.processesService.findAll(query, page);
        const response = createPaginatedResponse({
            data: processes,
            total,
            page,
        })

        return new Ok(response);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const process = await this.processesService.findUnique({
            where: { id },
            include: {
                cliente: true,
                escritorio: true,
            }
        });
        if (!process) throw new NotFoundException(`Processo com ID ${id} não encontrado.`);

        return new Ok({ data: process, message: 'Processo encontrado com sucesso.' });
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateProcessDto: UpdateProcessDto
    ) {
        const process = await this.processesService.update({
            where: { id },
            data: updateProcessDto,
        });

        return new Ok({ data: process, message: 'Processo atualizado com sucesso.' });
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const { message } = await this.processesService.remove(id);
        return new Ok({ message });
    }
}
