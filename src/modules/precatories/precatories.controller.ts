import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    NotFoundException,
    Query,
} from '@nestjs/common';
import { HonorariosDestacados, TipoVerba } from '@prisma/client';

import { PrecatoriesService } from './precatories.service';
import { CalculatorService } from '../calculator/calculator.service';

import { Ok } from 'src/shared/responses';
import { PageQuery, User } from 'src/shared/decorators';
import { PageQueryDto } from 'src/shared/@types';
import { createPaginatedResponse, dateFormatted, selicCalculator } from 'src/shared/utils';
import { MONTHS_STRING_SHORT } from 'src/shared/constants';

import { CreatePrecatoryDto, UpdatePrecatoryDto } from './dto';
import { PrecatoryEntity } from './entities';
import { UserWithoutPassword } from '../users/entities';

@Controller('precatories')
export class PrecatoriesController {
    constructor(
        private readonly precatoriesService: PrecatoriesService,
        private readonly calculatorService: CalculatorService,
    ) { }

    @Post()
    async create(
        @Body() createPrecatorioDto: CreatePrecatoryDto,
        @User() user: UserWithoutPassword,
    ) {
        const precatory = await this.precatoriesService.create({
            data: {
                ...createPrecatorioDto,
                status: 1,
                usuario_id: user.id,
                escritorio_id: user.escritorio_id,
            },
        });

        return new Ok({ data: precatory, message: 'Precatório criado com sucesso.' });
    }

    @Get()
    async findAll(
        @PageQuery({
            caseSensitive: ['tribunal_pagador'],
            equals: ['id', 'escritorio_id', 'usuario_id', 'cliente_id'],
            enumValidator: [
                { key: 'tipo_verba', enum: TipoVerba },
                { key: 'honorarios_destacados', enum: HonorariosDestacados },
            ],
            excludes: ['status']
        }) { page, query }: PageQueryDto<Partial<PrecatoryEntity>>,
        @Query('status') status?: string,
    ) {
        if (status) query.status = +status;

        const [total, preactories] = await this.precatoriesService.findAll(query, page);
        const response = createPaginatedResponse({
            data: preactories,
            total,
            page,
        })

        return new Ok(response);
    }

    @Get(':id')
    async findOne(
        @Param('id') id: string
    ) {
        const precatory = await this.precatoriesService.findUnique({
            where: { id },
            include: {
                cliente: true,
                escritorio: true,
                usuario: true,
            },
        });
        if (!precatory) throw new NotFoundException({
            message: 'Precatório não encontrado.',
            success: false,
            statusCode: 404,
            error: 'NotFound',
        });

        return new Ok({ data: precatory, message: 'Precatório encontrado com sucesso.' });
    }

    @Get('rra-calculator/:id')
    async calculateRRA(
        @Param('id') id: string,
    ) {
        const precatory = await this.precatoriesService.findUnique({ where: { id } });
        if (!precatory) throw new NotFoundException({
            message: 'Precatório não encontrado.',
            success: false,
            statusCode: 404,
            error: 'NotFound',
        });

        const year = precatory.data_levantamento.getFullYear();
        const month = precatory.data_levantamento.getMonth() + 1;

        const { totalRRA } = this.calculatorService.calculateRRA(0, {
            ano: year,
            mes: MONTHS_STRING_SHORT[month],
            numeroMeses: precatory.rra_meses,
            rendimentoTotal: +precatory.valor_bruto
        });

        const irSelicFixed = await selicCalculator({
            endDate: dateFormatted(),
            startDate: dateFormatted(precatory.data_levantamento),
            value: totalRRA,
        })

        return new Ok({
            data: {
                irSelicFixed,
                totalRRA,
                precatorio: precatory,
            },
            message: 'Cálculo de RRA realizado com sucesso.',
        })
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updatePrecatorioDto: UpdatePrecatoryDto
    ) {
        const precatory = await this.precatoriesService.update({
            where: { id },
            data: updatePrecatorioDto,
        });

        return new Ok({ data: precatory, message: 'Precatório atualizado com sucesso.' });
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        const { message } = await this.precatoriesService.delete(id);
        return new Ok({ message });
    }
}
