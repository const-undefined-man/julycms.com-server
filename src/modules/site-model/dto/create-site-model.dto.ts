import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, Length } from 'class-validator';

export class CreateSiteModelDto {
  @ApiProperty({ description: '模型名称', example: '文章模型' })
  @IsNotEmpty({ message: '名称不能为空' })
  @Length(1, 16, { message: '名称最多16个字符' })
  name: string;

  @ApiProperty({ description: '模型标识', example: 'article' })
  @IsNotEmpty({ message: '模型标识不能为空' })
  @Length(1, 32, { message: '模型标识最多32个字符' })
  mark: string;

  @ApiPropertyOptional({ description: '模型描述', example: '文章' })
  @Length(1, 255, { message: '模型描述最多255个字符' })
  @IsOptional()
  description: string;

  @ApiPropertyOptional({ description: '是否显示；0 隐藏；1 显示', example: 1 })
  @IsNumber(undefined, { message: '显示状态只能是数字' })
  @IsOptional()
  display: number;
}
