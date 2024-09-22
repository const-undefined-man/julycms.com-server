import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateSiteModelDto {
  @ApiProperty({ description: '模型名称', example: '文章模型' })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @Length(1, 16, { message: 'common.MinMax' })
  name: string;

  @ApiProperty({ description: '模型标识', example: 'article' })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @Length(1, 32, { message: 'common.MinMax' })
  mark: string;

  @ApiPropertyOptional({ description: '模型描述', example: '文章' })
  @MaxLength(255, { message: 'common.MaxLength' })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: '是否显示；0 隐藏；1 显示', example: 1 })
  @IsNumber(undefined, { message: 'common.IsNumber' })
  @IsOptional()
  display?: number;
}
