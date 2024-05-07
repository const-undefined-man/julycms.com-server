import { Module } from '@nestjs/common';
import { DocumentModule as ComDocumentModule } from '@app/modules';
import { DocumentController } from './document.controller';

@Module({
  imports: [ComDocumentModule],
  controllers: [DocumentController],
})
export class DocumentModule {}
