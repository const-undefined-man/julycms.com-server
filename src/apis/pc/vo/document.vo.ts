import { ApiPropertyOptional } from '@nestjs/swagger';

export class DocumentVO {
  @ApiPropertyOptional({ description: '标题' })
  title: string;

  @ApiPropertyOptional({ description: '内容' })
  content: string;
}
