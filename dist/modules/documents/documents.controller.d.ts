import { DocumentsService } from './documents.service';
import { Ok } from 'src/shared/responses';
import { PageQueryDto } from 'src/shared/@types';
import { CreateDocumentDto, UpdateDocumentDto } from './dto';
import { DocumentEntity } from './entities';
export declare class DocumentsController {
    private readonly documentsService;
    constructor(documentsService: DocumentsService);
    create(createDocumentDto: CreateDocumentDto): Promise<Ok>;
    findAll({ page, query, rawQuery }: PageQueryDto<Partial<DocumentEntity>>): Promise<Ok>;
    findOne(id: string): Promise<Ok>;
    update(id: string, updateDocumentDto: UpdateDocumentDto): Promise<Ok>;
    delete(id: string): Promise<Ok>;
}
