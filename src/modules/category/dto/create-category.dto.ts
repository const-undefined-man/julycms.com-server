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
  @IsNotEmpty({ message: '栏目名称不能为空' })
  @Length(1, 64, { message: '栏目名称为1~64个字符' })
  catname: string;

  @ApiPropertyOptional({ description: '栏目名称英文' })
  @Length(0, 64, { message: '栏目名称英文最大为64个字符' })
  @IsOptional()
  catnameEn: string;

  @ApiProperty({ description: '栏目目录' })
  @IsNotEmpty({ message: '栏目目录不能为空' })
  @Length(1, 64, { message: '栏目目录为1~64个字符' })
  catdir: string;

  @ApiPropertyOptional({ description: '栏目icon' })
  @IsOptional()
  @MaxLength(64, { message: '栏目icon最大为64个字符' })
  icon: string;

  @ApiPropertyOptional({ description: '栏目描述' })
  @MaxLength(255, { message: '栏目描述最大为255个字符' })
  @IsOptional()
  description: string;

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
  @MaxLength(128, { message: 'SEO标题最大为128个字符' })
  seoTitle: string;

  @ApiPropertyOptional({ description: 'SEO关键词' })
  @IsOptional()
  @MaxLength(255, { message: 'SEO关键词最大为255个字符' })
  seoKeywords: string;

  @ApiPropertyOptional({ description: 'SEO描述' })
  @IsOptional()
  @MaxLength(255, { message: 'SEO描述最大为255个字符' })
  seoDescription: string;

  @ApiPropertyOptional({ description: '是否显示；0 隐藏；1 显示', example: 1 })
  @IsNumber(undefined, { message: '显示状态只能是数字' })
  @IsOptional()
  display: number;

  @ApiPropertyOptional({
    description: '链接地址',
    example: 'http://www.julycms.com',
  })
  @IsUrl(undefined, { message: '链接地址格式错误' })
  @IsOptional()
  linkUrl: string;

  @ApiPropertyOptional({ description: '排序', example: 1 })
  @IsOptional()
  listorder: number;

  @ApiProperty({ description: '父级栏目', example: '{id: 0}' })
  @IsObject({ message: '父级栏目是一个对象:{id: 1}' })
  parent: Category;

  @ApiProperty({ description: '栏目模型', example: '{id: 1}' })
  @IsObject({ message: '模型是一个对象:{id: 1}' })
  siteModel: SiteModel;
}
