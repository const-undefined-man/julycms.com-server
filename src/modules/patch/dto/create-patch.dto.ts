import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Length,
  MaxLength,
} from 'class-validator';

export class CreatePatchDto {
  @ApiProperty({ description: '标题', example: '标题' })
  @IsNotEmpty({ message: '标题不能为空' })
  @Length(1, 32, { message: '标题为1~32位字符' })
  title: string;

  @ApiPropertyOptional({ description: '描述', example: '描述' })
  @IsOptional()
  @MaxLength(255, { message: '描述最大为255个字符' })
  description: string;

  @ApiPropertyOptional({ description: '类型', example: 0 })
  @IsOptional()
  @IsNumber(undefined, { message: '类型只能为0或1' })
  type: number;

  // @ApiPropertyOptional({ type: () => CreatePatchTextDto, description: '富文本内容', example: CreatePatchTextDto })
  // @Type(() => CreatePatchTextDto)
  // @ValidateNested()
  // patchText: CreatePatchTextDto;

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
