import { Attachement } from '@app/modules/attachement/entities/attachement.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';

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
  @IsOptional()
  @MaxLength(255, { message: '碎片描述最大为255个字符' })
  description: string;

  @ApiPropertyOptional({ example: '碎片图片', description: '碎片图片' })
  @IsOptional()
  img: Attachement;

  @ApiPropertyOptional({ example: '碎片链接', description: '碎片链接' })
  @IsOptional()
  @MaxLength(255, { message: '碎片链接最大为255个字符' })
  url: string;

  @ApiPropertyOptional({ example: 99, description: '碎片排序' })
  @IsOptional()
  listorder: number;
}
