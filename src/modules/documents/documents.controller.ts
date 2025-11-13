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

import { DocumentsService } from './documents.service';
import { S3Service } from '../s3/s3.service';

import { Ok } from 'src/shared/responses';
import { PageQueryDto } from 'src/shared/@types';
import { PageQuery } from 'src/shared/decorators';
import { createPaginatedResponse } from 'src/shared/utils';

import { CreateDocumentDto, UpdateDocumentDto } from './dto';
import { DocumentEntity } from './entities';

@Controller('documents')
export class DocumentsController {
    constructor(
        private readonly documentsService: DocumentsService,
        private readonly s3Service: S3Service,
    ) { }

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

    @Get("presigned-url")
    async getPresignedUrl(
        @Query("fileName") fileName: string,
        @Query("fileType") fileType: string,
        @Query("method") method: string,
    ) {
        const url = method === 'put'
            ? await this.s3Service.generatePresignedUrl(fileName, fileType)
            : await this.s3Service.getDownloadUrl(fileName);

        return new Ok({
            data: { url },
            message: 'Documento criado com sucesso.',
        })
    }

    @Get()
    async findAll(
        @PageQuery({
            equals: ['precatorio_id', 'id'],
        }) { page, query }: PageQueryDto<Partial<DocumentEntity>>
    ) {
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
            include: { precatorio: true },
        });
        if (!document) throw new NotFoundException({
            message: 'Documento não encontrado.',
            success: false,
            statusCode: 404,
            error: 'NotFound',
        });

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
