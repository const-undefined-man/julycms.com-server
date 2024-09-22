import { QueryDto } from '@app/modules/query-dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class QueryLogDto extends QueryDto {
  @ApiPropertyOptional({ description: '操作人', example: 'admin' })
  @IsOptional()
  username?: string;

  @ApiPropertyOptional({ description: '操作时间', example: '2022-01-01' })
  @IsOptional()
  createdAt?: Array<string>;
}
