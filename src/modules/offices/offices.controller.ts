import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    NotFoundException,
} from '@nestjs/common';
import { OfficesService } from './offices.service';

import { PageQuery, Public, Roles } from 'src/shared/decorators';
import { createPaginatedResponse } from 'src/shared/utils';
import { Ok } from 'src/shared/responses';
import { ProfileType } from 'src/shared/enum';
import { PageQueryDto } from 'src/shared/@types';

import { OfficeEntity } from './entities';

import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/update-office.dto';

@Roles(ProfileType.ADMIN)
@Controller('offices')
export class OfficesController {
    constructor(private readonly officesService: OfficesService) { }

    @Post()
    async create(@Body() createOfficeDto: CreateOfficeDto) {
        const office = await this.officesService.create({ data: createOfficeDto });
        return new Ok({ data: office, message: 'Escritório criado com sucesso.' });
    }

    @Get()
    async findAll(
        @PageQuery({
            caseSensitive: ['nome_fantasia', 'responsaveis_legais'],
            equals: ['cnpj', 'id'],
        }) { page, query }: PageQueryDto<Partial<OfficeEntity>>
    ) {
        const [total, offices] = await this.officesService.findAll(query, page);
        const response = createPaginatedResponse({
            data: offices,
            total,
            page,
        })

        return new Ok(response);
    }

    @Roles(ProfileType.ADMIN, ProfileType.ADVOGADO, ProfileType.CLIENTE_INDIVIDUAL)
    @Get(':id')
    async findOne(
        @Param('id') id: string,
    ) {
        const data = await this.officesService.findOne(id);
        if (!data) throw new NotFoundException('Escritório não encontrado.');

        return new Ok({ data, message: 'Escritório encontrado com sucesso.' });
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateOfficeDto: UpdateOfficeDto,
    ) {
        const office = await this.officesService.update({
            where: { id },
            data: updateOfficeDto,
        });

        return new Ok({ data: office, message: 'Escritório atualizado com sucesso.' });
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        const { message } = await this.officesService.delete(id);
        return new Ok({ message });
    }
}
