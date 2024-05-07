import { Attachement } from '@app/modules/attachement/entities/attachement.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsUrl } from 'class-validator';

export class CreatePatchListDto {
  @ApiProperty({ description: '碎片id', example: 1 })
  @IsNotEmpty({ message: '碎片id不能为空' })
  @IsNumber(undefined, { message: '碎片id必须是数字' })
  patchId: number;

  @ApiPropertyOptional({ description: '碎片列表id', example: 1 })
  @IsOptional()
  id: number;

  @ApiProperty({ example: '碎片标题', description: '碎片标题' })
  @IsNotEmpty({ message: '碎片标题不能为空' })
  title: string;

  @ApiPropertyOptional({ example: '碎片描述', description: '碎片描述' })
  @IsOptional({ message: '碎片描述不能为空' })
  description: string;

  @ApiPropertyOptional({ example: '碎片图片', description: '碎片图片' })
  @IsOptional({ message: '碎片图片不能为空' })
  img: Attachement;

  @ApiPropertyOptional({ example: '碎片链接', description: '碎片链接' })
  @IsOptional({ message: '碎片链接不能为空' })
  @IsUrl(undefined, { message: '碎片链接格式不正确' })
  url: string;

  @ApiPropertyOptional({ example: 99, description: '碎片排序' })
  @IsOptional({ message: '碎片排序不能为空' })
  listorder: number;
}
