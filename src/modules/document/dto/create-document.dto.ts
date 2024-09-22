import { Tag } from '@app/modules/tag/entities/tag.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  Length,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Content } from '../entities/content.entity';
import { Attachement } from '@app/modules/attachement/entities/attachement.entity';
import { LinkDto } from './link.dto';
import { Type } from 'class-transformer';

export class CreateDocumentDto {
  @ApiProperty({ description: '标题', example: '标题' })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @Length(1, 64, { message: 'common.MinMax' })
  title: string;

  @ApiPropertyOptional({ description: '描述', example: '描述' })
  @MaxLength(255, { message: 'common.MaxLength' })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: '封面图片', example: '封面图片' })
  @IsOptional()
  @IsObject({ message: 'common.IsObject' })
  cover?: Attachement;

  @ApiPropertyOptional({ description: 'SEO标题', example: 'SEO标题' })
  @IsOptional()
  @MaxLength(128, { message: 'common.MaxLength' })
  seoTitle: string;

  @ApiPropertyOptional({ description: 'SEO关键词', example: 'SEO关键词' })
  @MaxLength(255, { message: 'common.MaxLength' })
  @IsOptional()
  seoKeywords?: string;

  @ApiPropertyOptional({ description: 'SEO描述', example: 'SEO描述' })
  @MaxLength(255, { message: 'common.MaxLength' })
  @IsOptional()
  seoDescription: string;

  @ApiPropertyOptional({ description: '是否显示', example: 1 })
  @IsOptional()
  @IsNumber(undefined, { message: 'common.IsDisplay' })
  display?: number;

  @ApiPropertyOptional({ description: '阅读数', example: 999 })
  @IsOptional()
  @IsNumber(undefined, { message: 'common.IsNumber' })
  readNum?: number;

  @ApiPropertyOptional({ description: '点赞数', example: 999 })
  @IsOptional()
  @IsNumber(undefined, { message: 'common.IsNumber' })
  likeNum?: number;

  @ApiPropertyOptional({ description: '关联标签', example: [{ id: 1 }] })
  @IsOptional()
  @IsArray({ message: 'common.IsArray' })
  tags?: number[];

  @ApiProperty({ description: '关联导航栏目', example: [{ id: 1 }] })
  @IsNumber(undefined, { message: 'common.IsNumber' })
  category: number;

  @ApiProperty({ description: '文章内容', example: '富文本内容' })
  @IsOptional()
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  content?: Content;

  @ApiPropertyOptional({
    type: () => LinkDto,
    description: '链接模型',
    example: { url: 'https://www.zhuolian.tech', follow: 1, target: 0 },
  })
  @IsOptional()
  @Type(() => LinkDto)
  @ValidateNested()
  link?: LinkDto;
}
