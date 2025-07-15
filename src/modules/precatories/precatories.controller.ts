import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    BadRequestException,
    NotFoundException,
} from '@nestjs/common';
import { HonorariosDestacados, TipoVerba } from '@prisma/client';

import { PrecatoriesService } from './precatories.service';
import { CalculatorService } from '../calculator/calculator.service';

import { Ok } from 'src/shared/responses';
import { PageQuery } from 'src/shared/decorators';
import { PageQueryDto } from 'src/shared/@types';
import { createPaginatedResponse, dateFormatted, selicCalculator } from 'src/shared/utils';
import { MONTHS_STRING_SHORT } from 'src/shared/constants';

import { CreatePrecatoryDto, UpdatePrecatoryDto } from './dto';
import { PrecatoryEntity } from './entities';

@Controller('precatories')
export class PrecatoriesController {
    constructor(
        private readonly precatoriesService: PrecatoriesService,
        private readonly calculatorService: CalculatorService,
    ) { }

    @Post()
    async create(
        @Body() createPrecatorioDto: CreatePrecatoryDto
    ) {
        if (!createPrecatorioDto.escritorio_id && !createPrecatorioDto.usuario_id)
            throw new BadRequestException('`escritorio_id` ou `usuario_id` deve ser informado. Ambos estão vazios.');

        if (createPrecatorioDto.escritorio_id && createPrecatorioDto.usuario_id)
            throw new BadRequestException('`escritorio_id` ou `usuario_id` deve estar nulo. Ambos estão preenchidos.');

        const data = await this.precatoriesService.create({
            data: {
                ...createPrecatorioDto,
            },
        });

        return new Ok({ data, message: 'Precatório criado com sucesso.' });
    }

    @Get()
    async findAll(
        @PageQuery({
            caseSensitive: ['tribunal_pagador'],
            equals: ['id', 'escritorio_id', 'usuario_id', 'cliente_id'],
            enumValidator: [
                { key: 'tipo_verba', enum: TipoVerba },
                { key: 'honorarios_destacados', enum: HonorariosDestacados },
            ]
        }) { page, query }: PageQueryDto<Partial<PrecatoryEntity>>
    ) {
        const [total, data] = await this.precatoriesService.findAll(query, page);
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
        const data = await this.precatoriesService.findUnique({
            where: { id },
            include: {
                cliente: true,
                escritorio: true,
                usuario: true,
            },
        });
        if (!data) throw new NotFoundException('Precatório não encontrado.');

        return new Ok({ data, message: 'Precatório encontrado com sucesso.' });
    }

    @Get('rra-calculator/:id')
    async calculateRRA(
        @Param('id') id: string,
    ) {
        const precatorio = await this.precatoriesService.findUnique({ where: { id } });
        if (!precatorio) throw new NotFoundException('Precatório não encontrado.');

        const year = precatorio.data_levantamento.getFullYear();
        const month = precatorio.data_levantamento.getMonth() + 1;

        const { totalRRA } = this.calculatorService.calculateRRA({
            ano: year,
            deducoes: 0,
            mes: MONTHS_STRING_SHORT[month],
            numeroMeses: precatorio.rra_meses,
            rendimentoTotal: +precatorio.valor_bruto
        });

        const irSelicFixed = await selicCalculator({
            endDate: dateFormatted(),
            startDate: dateFormatted(precatorio.data_levantamento),
            value: totalRRA,
        })

        return new Ok({
            data: {
                irSelicFixed,
                totalRRA,
                precatorio,
            },
            message: 'Cálculo de RRA realizado com sucesso.',
        })
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updatePrecatorioDto: UpdatePrecatoryDto
    ) {
        const data = await this.precatoriesService.update({
            where: { id },
            data: updatePrecatorioDto,
        });

        return new Ok({ data, message: 'Precatório atualizado com sucesso.' });
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        const response = await this.precatoriesService.delete(id);
        return new Ok(response);
    }
}
