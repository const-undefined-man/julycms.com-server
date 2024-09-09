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
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @Length(1, 20, { message: 'common.MinMax' })
  name: string;

  @ApiPropertyOptional({ description: '标签拼音' })
  @IsOptional()
  @MaxLength(64, { message: 'common.MaxLength' })
  pinyin?: string;

  @ApiPropertyOptional({ description: '首字母' })
  @IsOptional()
  @MaxLength(1, { message: 'common.MaxLength' })
  letter?: string;

  @ApiPropertyOptional({ description: 'SEO标题' })
  @IsOptional()
  @MaxLength(128, { message: 'common.MaxLength' })
  seoTitle?: string;

  @ApiPropertyOptional({ description: 'SEO关键词' })
  @IsOptional()
  @MaxLength(255, { message: 'common.MaxLength' })
  seoKeywords?: string;

  @ApiPropertyOptional({ description: 'SEO描述' })
  @IsOptional()
  @MaxLength(255, { message: 'common.MaxLength' })
  seoDescription?: string;

  @ApiPropertyOptional({ description: '是否显示；0 隐藏；1 显示', example: 1 })
  @IsNumber(undefined, { message: 'common.IsNumber' })
  @IsOptional()
  display?: number;
}
