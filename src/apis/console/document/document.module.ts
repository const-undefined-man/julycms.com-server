import { Module } from '@nestjs/common';
import {
  CategoryModule,
  DocumentModule as ComDocumentModule,
} from '@app/modules';
import { DocumentController } from './document.controller';

@Module({
  imports: [ComDocumentModule, CategoryModule],
  controllers: [DocumentController],
})
export class DocumentModule {}
