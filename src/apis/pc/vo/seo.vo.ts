import { ApiPropertyOptional } from '@nestjs/swagger';

export class SeoVO {
  @ApiPropertyOptional({ description: '标题' })
  title: string;

  @ApiPropertyOptional({ description: '描述' })
  description: string;

  @ApiPropertyOptional({ description: '关键字' })
  keywords: string;
}
