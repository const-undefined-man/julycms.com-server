import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class BatchDisplayDto {
  @ApiProperty({
    description: '批量操作的id',
    example: [1, 2, 3, 4, 5],
  })
  @IsNotEmpty({ message: 'ids不能为空' })
  @IsArray({ message: 'ids必须是数组' })
  ids: number[];

  @ApiProperty({
    description: '批量操作的显示状态',
    example: 1,
  })
  @IsNotEmpty({ message: 'display不能为空' })
  @IsNumber({}, { message: 'display必须是数字' })
  display: number;
}
