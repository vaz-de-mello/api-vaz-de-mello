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
import { TipoDocumento } from '@prisma/client';

import { DocumentsService } from './documents.service';

import { Ok } from 'src/shared/responses';
import { PageQueryDto } from 'src/shared/@types';
import { PageQuery } from 'src/shared/decorators';
import { createPaginatedResponse } from 'src/shared/utils';

import { CreateDocumentDto, UpdateDocumentDto } from './dto';
import { DocumentEntity } from './entities';

@Controller('documents')
export class DocumentsController {
    constructor(private readonly documentsService: DocumentsService) { }

    @Post()
    async create(@Body() createDocumentDto: CreateDocumentDto) {
        const document = await this.documentsService.create({
            data: createDocumentDto,
        });

        return new Ok({
            data: document,
            message: 'Documento criado com sucesso.',
        })
    }

    @Get()
    async findAll(
        @PageQuery({
            equals: ['cliente_id', 'id'],
            excludes: ['assinatura_validada'],
            enumValidator: [
                { key: 'tipo_documento', enum: TipoDocumento },
            ]
        }) { page, query, rawQuery }: PageQueryDto<Partial<DocumentEntity>>
    ) {
        if (rawQuery.assinatura_validada) query.assinatura_validada = String(rawQuery.assinatura_validada) === 'true';

        const [total, documents] = await this.documentsService.findAll(query, page);
        const response = createPaginatedResponse({
            data: documents,
            total,
            page,
        });

        return new Ok(response);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const document = await this.documentsService.findUnique({
            where: { id },
            include: { cliente: true },
        });
        if (!document) throw new NotFoundException(`Documento com ID ${id} não encontrado.`);

        return new Ok({
            data: document,
            message: 'Documento encontrado com sucesso.',
        });
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateDocumentDto: UpdateDocumentDto
    ) {
        const document = await this.documentsService.update({
            where: { id },
            data: updateDocumentDto,
        });

        return new Ok({
            data: document,
            message: 'Documento atualizado com sucesso.',
        });
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        const { message } = await this.documentsService.delete(id);
        return new Ok({
            message,
        });
    }
}
