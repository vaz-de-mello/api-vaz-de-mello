import { DocumentsService } from './documents.service';
import { S3Service } from '../s3/s3.service';
import { Ok } from 'src/shared/responses';
import { PageQueryDto } from 'src/shared/@types';
import { CreateDocumentDto, UpdateDocumentDto } from './dto';
import { DocumentEntity } from './entities';
import { UserWithoutPassword } from '../users/entities';
export declare class DocumentsController {
    private readonly documentsService;
    private readonly s3Service;
    constructor(documentsService: DocumentsService, s3Service: S3Service);
    create(createDocumentDto: CreateDocumentDto, { nome }: UserWithoutPassword): Promise<Ok>;
    getPresignedUrl(fileName: string, fileType: string, method: string): Promise<Ok>;
    findAll({ page, query }: PageQueryDto<Partial<DocumentEntity>>): Promise<Ok>;
    findOne(id: string): Promise<Ok>;
    update(id: string, updateDocumentDto: UpdateDocumentDto, { nome }: UserWithoutPassword): Promise<Ok>;
    delete(id: string): Promise<Ok>;
}
