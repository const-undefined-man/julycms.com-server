import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty({ description: 'id', example: 1 })
  @IsNotEmpty({ message: 'id不能为空' })
  @IsNumber(undefined, { message: 'id为数字' })
  id: number;
}
