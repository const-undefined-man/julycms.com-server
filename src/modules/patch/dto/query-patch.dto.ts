import { QueryDto } from "@app/modules/query-dto"
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumberString, IsOptional } from "class-validator";

export class QueryPatchDto extends QueryDto {
  @ApiPropertyOptional({ description: 'id', example: 1 })
  @IsOptional()
  @IsNumberString(undefined, { message: 'common.IsNumber' })
  id?: number;

  @ApiPropertyOptional({ description: '标题', example: '标题' })
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ description: '类型', example: 1 })
  @IsOptional()
  @IsNumberString(undefined, { message: 'common.IsNumber' })
  type?: number;
}