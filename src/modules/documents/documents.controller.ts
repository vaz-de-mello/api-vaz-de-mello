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
import { PageQuery, User } from 'src/shared/decorators';
import { createPaginatedResponse } from 'src/shared/utils';

import { CreateDocumentDto, UpdateDocumentDto } from './dto';
import { DocumentEntity } from './entities';
import { UserWithoutPassword } from '../users/entities';

@Controller('documents')
export class DocumentsController {
    constructor(
        private readonly documentsService: DocumentsService,
        private readonly s3Service: S3Service,
    ) { }

    @Post()
    async create(
        @Body() createDocumentDto: CreateDocumentDto,
        @User() { nome }: UserWithoutPassword,
    ) {
        const document = await this.documentsService.create({
            data: {
                ...createDocumentDto,
                usuario: nome
            },
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
        let service: Promise<string>;

        switch (method) {
            case 'get':
                service = this.s3Service.getDownloadUrl(fileName);
                break;

            case 'put':
                service = this.s3Service.generatePresignedUrl(fileName, fileType);
                break;

            default:
                service = this.s3Service.getDownloadUrl(fileName);
                break;
        }
        const url = await service;

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
        @Body() updateDocumentDto: UpdateDocumentDto,
        @User() { nome }: UserWithoutPassword,
    ) {
        const document = await this.documentsService.update({
            where: { id },
            data: {
                ...updateDocumentDto,
                usuario: nome,
            },
        });

        return new Ok({
            data: document,
            message: 'Documento atualizado com sucesso.',
        });
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        const document = await this.documentsService.findUnique({
            where: { id },
        });
        if (!document) throw new NotFoundException({
            message: 'Documento não encontrado.',
            success: false,
            statusCode: 404,
            error: 'NotFound',
        });

        const [deleteServiceResponse] = await Promise.all([
            this.documentsService.delete(id),
            this.s3Service.deleteFile(`${document.arquivo}_${document.precatorio_id}`),
        ]);

        const { message } = deleteServiceResponse;

        return new Ok({
            message,
        });
    }
}
