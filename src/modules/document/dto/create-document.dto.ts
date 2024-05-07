import { Tag } from '@app/modules/tag/entities/tag.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  Length,
  ValidateNested,
} from 'class-validator';
import { Content } from '../entities/content.entity';
import { Album } from '../entities/album.entity';
import { Attachement } from '@app/modules/attachement/entities/attachement.entity';
import { LinkDto } from './link.dto';
import { Type } from 'class-transformer';

export class CreateDocumentDto {
  @ApiProperty({ description: '标题', example: '标题' })
  @IsNotEmpty({ message: '标题不能为空' })
  @Length(1, 64, { message: '标题为1~64位字符' })
  title: string;

  @ApiPropertyOptional({ description: '副标题', example: '副标题' })
  @Length(0, 64, { message: '副标题为1~64位字符' })
  @IsOptional()
  subTitle: string;

  @ApiPropertyOptional({ description: '封面图片', example: '封面图片' })
  @IsOptional()
  @IsObject({ message: '封面图片为Object类型' })
  cover: Attachement;

  @ApiPropertyOptional({ description: 'SEO标题', example: 'SEO标题' })
  @IsOptional()
  @Length(0, 128, { message: 'SEO标题大为128位字符' })
  seoTitle: string;

  @ApiPropertyOptional({ description: 'SEO关键词', example: 'SEO关键词' })
  @Length(0, 255, { message: 'SEO关键词最大为255位字符' })
  @IsOptional()
  seoKeywords: string;

  @ApiPropertyOptional({ description: 'SEO描述', example: 'SEO描述' })
  @Length(0, 255, { message: 'SEO描述最大为255位字符' })
  @IsOptional()
  seoDescription: string;

  @ApiPropertyOptional({ description: '是否显示', example: 1 })
  @IsOptional()
  @IsNumber(undefined, { message: '显示状态只能为0 或者 1' })
  display: number;

  @ApiPropertyOptional({ description: '阅读数', example: 999 })
  @IsOptional()
  @IsNumber(undefined, { message: '阅读数为数字' })
  readNum: number;

  @ApiPropertyOptional({ description: '点赞数', example: 999 })
  @IsOptional()
  @IsNumber(undefined, { message: '点赞数为数字' })
  likeNum: number;

  @ApiPropertyOptional({ description: '关联标签', example: [{ id: 1 }] })
  @IsOptional()
  @IsArray({ message: '关联标签为数组' })
  tags: Tag[];

  @ApiProperty({ description: '关联导航栏目', example: [{ id: 1 }] })
  @IsNumber(undefined, { message: '关联导航栏目为数字' })
  category: number;

  @ApiProperty({ description: '文章内容', example: '富文本内容' })
  @IsOptional()
  @IsNotEmpty({ message: '文章内容不能为空' })
  content: Content;

  @ApiPropertyOptional({
    description: '图集',
    example: [{ listorder: 1, img: '', description: '' }],
  })
  @IsOptional()
  @IsArray({ message: '图集内容为数组' })
  albums: Album[];

  @ApiPropertyOptional({
    type: () => LinkDto,
    description: '链接模型',
    example: { url: 'https://www.zhuolian.tech', follow: 1, target: 0 },
  })
  @Type(() => LinkDto)
  @ValidateNested()
  link: LinkDto;
}
