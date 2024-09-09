import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, Length } from 'class-validator';

export class CreateDictValueDto {
  @ApiProperty({ description: '字典名称', example: '启用' })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @Length(1, 16, { message: 'common.MinMax' })
  label: string;

  @ApiProperty({ description: '字典值', example: 1 })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  value: string | null;

  @ApiProperty({ description: '颜色风格', example: 'primary' })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  style: string | null;

  @ApiPropertyOptional({ description: '是否显示；0 隐藏；1 显示', example: 1 })
  @IsNumber(undefined, { message: 'common.IsNumber' })
  @IsOptional()
  display?: number | 1;

  @ApiPropertyOptional({ description: '排序', example: 1 })
  @IsNumber(undefined, { message: 'common.IsNumber' })
  @IsOptional()
  listorder?: number | 1;

  @ApiProperty({ description: '所属字典', example: 1 })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @IsNumber(undefined, { message: 'common.IsNumber' })
  dict: number;
}
