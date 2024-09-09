import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsUrl,
  Length,
  MaxLength,
} from 'class-validator';
import { Category } from '../entities/category.entity';
import { SiteModel } from '@app/modules/site-model/entities/site-model.entity';
import { CreateAttachementDto } from '@app/modules/attachement/dto/create-attachement.dto';
import { Type } from 'class-transformer';

export class CreateCategoryDto {
  @ApiProperty({ description: '栏目名称' })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @Length(1, 64, { message: 'common.MinMax' })
  catname: string;

  @ApiPropertyOptional({ description: '栏目名称英文' })
  @MaxLength(64, { message: 'common.MaxLength' })
  @IsOptional()
  catnameEn?: string;

  @ApiProperty({ description: '栏目目录' })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @Length(1, 64, { message: 'common.MinMax' })
  catdir: string;

  @ApiPropertyOptional({ description: '栏目icon' })
  @IsOptional()
  @MaxLength(64, { message: 'common.MaxLength' })
  icon?: string;

  @ApiPropertyOptional({ description: '栏目描述' })
  @MaxLength(255, { message: 'common.MaxLength' })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    type: CreateAttachementDto,
    description: '栏目图片icon',
    example: {
      id: 1,
      url: 'https://www.zhuolian.tech',
      size: 1,
      mimetype: '',
      operatorType: 1,
    },
  })
  @Type(() => CreateAttachementDto)
  imgIcon: CreateAttachementDto;

  @ApiPropertyOptional({
    type: CreateAttachementDto,
    description: '栏目封面',
    example: {
      id: 1,
      url: 'https://www.zhuolian.tech',
      size: 1,
      mimetype: '',
      operatorType: 1,
    },
  })
  @Type(() => CreateAttachementDto)
  cover: CreateAttachementDto;

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

  @ApiPropertyOptional({
    description: '链接地址',
    example: 'http://www.julycms.com',
  })
  @IsUrl(undefined, { message: 'common.IsFormat' })
  @IsOptional()
  linkUrl?: string;

  @ApiPropertyOptional({ description: '排序', example: 1 })
  @IsOptional()
  listorder?: number;

  @ApiProperty({ description: '父级栏目', example: '{id: 0}' })
  @IsObject({ message: 'common.IsObject' })
  parent: Category;

  @ApiProperty({ description: '栏目模型', example: '{id: 1}' })
  @IsObject({ message: 'common.IsObject' })
  siteModel: SiteModel;
}
