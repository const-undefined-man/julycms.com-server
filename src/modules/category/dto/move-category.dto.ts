import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class MoveCategoryDto {
  @ApiProperty({ description: '被移动的栏目ID数组', example: '[1,2,3]' })
  @IsArray({ message: 'common.IsArray' })
  from: number[];

  @ApiProperty({ description: '目标栏目ID', example: '1' })
  @IsNumber(undefined, { message: 'common.IsNumber' })
  to: number;
}
