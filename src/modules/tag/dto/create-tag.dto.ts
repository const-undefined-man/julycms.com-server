import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateTagDto {
  @ApiProperty({ description: '标签名称' })
  @IsNotEmpty({ message: '标签名称不能为空' })
  @Length(1, 20, { message: '标签名称为1~20位字符' })
  name: string;

  @ApiPropertyOptional({ description: '标签拼音' })
  @IsOptional()
  @Length(0, 64, { message: '标签拼音最大为64个字符' })
  pinyin: string;

  @ApiPropertyOptional({ description: '首字母' })
  @IsOptional()
  @Length(0, 1, { message: '首字母最大为1个字符' })
  letter: string;

  @ApiPropertyOptional({ description: 'SEO标题' })
  @IsOptional()
  @Length(0, 128, { message: 'SEO标题最大为128个字符' })
  seoTitle: string;

  @ApiPropertyOptional({ description: 'SEO关键词' })
  @IsOptional()
  @Length(0, 255, { message: 'SEO关键词最大为255个字符' })
  seoKeywords: string;

  @ApiPropertyOptional({ description: 'SEO描述' })
  @IsOptional()
  @MaxLength(255, { message: 'SEO描述最大为255个字符' })
  seoDescription: string;

  @ApiPropertyOptional({ description: '是否显示；0 隐藏；1 显示', example: 1 })
  @IsNumber(undefined, { message: '显示状态只能是数字' })
  @IsOptional()
  display: number;
}
