import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty({ description: 'id', example: 1 })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @IsNumber(undefined, { message: 'common.IsNumber' })
  id: number;
}
