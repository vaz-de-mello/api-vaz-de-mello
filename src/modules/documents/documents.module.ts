import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { S3Module } from '../s3/s3.module';

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService],
  imports: [S3Module],
})
export class DocumentsModule { }
