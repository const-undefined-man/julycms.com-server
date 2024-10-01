import { QueryDto } from '@app/modules/query-dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional, MaxLength } from 'class-validator';

export class QueryRoleDto extends QueryDto {
  @ApiPropertyOptional({ description: '角色名称', example: '角色1' })
  @MaxLength(32, { message: 'common.MaxLength' })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: '角色启用状态, 0 禁用；1 启用',
    example: 1,
  })
  @IsNumberString(undefined, { message: 'common.IsNumber' })
  @IsOptional()
  display?: number | 1;
}
