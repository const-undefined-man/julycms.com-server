import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export abstract class QueryDto {
  @ApiPropertyOptional({ description: '第几页', example: 1 })
  @IsOptional()
  @IsNumberString(undefined, { message: 'common.IsNumber' })
  page?: number;

  @ApiPropertyOptional({ description: '每页显示数量', example: 10 })
  @IsOptional()
  @IsNumberString(undefined, { message: 'common.IsNumber' })
  limit?: number;
}
