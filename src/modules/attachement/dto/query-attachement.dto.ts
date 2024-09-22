import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, MaxLength } from 'class-validator';
import { QueryDto } from '@app/modules/query-dto';

export class QueryAttachementDto extends QueryDto {
  @ApiPropertyOptional({ description: 'id' })
  @IsOptional()
  @IsNumber(undefined, { message: 'common.IsNumber' })
  id?: number;

  @ApiPropertyOptional({ description: '大小' })
  @IsOptional()
  @IsArray({ message: 'common.IsArray' })
  size?: Array<number>;

  @ApiPropertyOptional({ description: '操作人' })
  @IsOptional()
  @IsNumber(undefined, { message: 'common.IsNumber' })
  operatorId?: number;

  @ApiPropertyOptional({ description: '创建时间' })
  @IsOptional()
  @IsArray({ message: 'common.IsArray' })
  createdAt?: Array<string>;
}
