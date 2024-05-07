import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, Length } from 'class-validator';

export class CreateDictValueDto {
  @ApiProperty({ description: '字典名称', example: '启用' })
  @IsNotEmpty({ message: '字典名称不能为空' })
  @Length(1, 16, { message: '字典名称为1~16个字符' })
  label: string;

  @ApiProperty({ description: '字典值', example: 1 })
  @IsNotEmpty({ message: '字典值不能为空' })
  value: string | null;

  @ApiProperty({ description: '颜色风格', example: 'primary' })
  @IsNotEmpty({ message: '颜色风格不能为空' })
  style: string | null;

  @ApiPropertyOptional({ description: '是否显示；0 隐藏；1 显示', example: 1 })
  @IsNumber(undefined, { message: '显示状态只能是数字' })
  @IsOptional()
  display: number | 1;

  @ApiPropertyOptional({ description: '排序', example: 1 })
  @IsNumber(undefined, { message: '排序只能是数字' })
  @IsOptional()
  listorder: number | 1;

  @ApiProperty({ description: '所属字典', example: 1 })
  @IsNotEmpty({ message: '所属字典不能为空' })
  @IsNumber(undefined, { message: '所属字典只能是数字' })
  dict: number;
}
