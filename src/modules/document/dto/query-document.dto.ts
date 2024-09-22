import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional, MaxLength } from 'class-validator';
import { QueryDto } from '@app/modules/query-dto';

export class QueryDocumentDto extends QueryDto {
  @ApiPropertyOptional({ description: '文章ID', example: 1 })
  @IsOptional()
  @IsNumberString(undefined, { message: 'common.IsNumber' })
  id?: number;

  @ApiPropertyOptional({ description: '标题', example: '标题' })
  @IsOptional()
  @MaxLength(255, { message: 'common.MaxLength' })
  title?: string;
}
