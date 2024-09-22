import { QueryDto } from '@app/modules/query-dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Length } from 'class-validator';

export class QueryTagDto extends QueryDto {
  @ApiPropertyOptional({ description: '标签名称' })
  @Length(1, 20, { message: 'common.MinMax' })
  @IsOptional()
  name?: string;
}
