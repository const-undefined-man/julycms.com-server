import { Document } from '@app/modules/document/entities/document.entity';
import { CategoryVo } from './category.vo';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class DetailVo extends CategoryVo {
  @ApiPropertyOptional({ description: '内容' })
  document: Document;
}
