import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { PrecatoriosService } from './precatorios.service';

import { Ok } from 'src/shared/responses';

import { CreatePrecatorioDto, UpdatePrecatorioDto } from './dto';

@Controller('precatorios')
export class PrecatoriosController {
    constructor(private readonly precatoriosService: PrecatoriosService) { }

    @Post()
    async create(
        @Body() createPrecatorioDto: CreatePrecatorioDto
    ) {
        const data = await this.precatoriosService.create({
            data: {
                ...createPrecatorioDto,
            },
        });

        return new Ok({ data, message: 'Precatório criado com sucesso.' });
    }

    @Get()
    async findAll() {
        return this.precatoriosService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.precatoriosService.findOne(+id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updatePrecatorioDto: UpdatePrecatorioDto) {
        return this.precatoriosService.update(+id, updatePrecatorioDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.precatoriosService.remove(+id);
    }
}
