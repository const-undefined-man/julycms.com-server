import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Length,
  MaxLength,
} from 'class-validator';
import { CreatePatchTextDto } from './create-patch-text.dto';
import { Type } from 'class-transformer';

export class CreatePatchDto {
  @ApiProperty({ description: '标题', example: '标题' })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @Length(1, 32, { message: 'common.MinMax' })
  title: string;

  @ApiPropertyOptional({ description: '描述', example: '描述' })
  @IsOptional()
  @MaxLength(255, { message: 'common.MaxLength' })
  description?: string;

  @ApiPropertyOptional({ description: '类型', example: 0 })
  @IsOptional()
  @IsNumber(undefined, { message: 'common.IsDisplay' })
  type?: number;

  @ApiPropertyOptional({
    type: () => CreatePatchTextDto,
    description: '富文本内容',
    example: CreatePatchTextDto,
  })
  @Type(() => CreatePatchTextDto)
  @IsOptional()
  patchText?: CreatePatchTextDto;

  // @ApiPropertyOptional({
  // 	type: () => [CreatePatchListDto],
  // 	description: '碎片列表',
  // 	example: [{ id: 1, title: '碎片标题', description: '碎片描述', img: {}, url: '' }],
  // })
  // @Type(() => CreatePatchListDto)
  // @IsArray()
  // @ValidateNested({ each: true })
  // patchList: CreatePatchListDto[];
}
