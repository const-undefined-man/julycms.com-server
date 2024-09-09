import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class BatchDisplayDto {
  @ApiProperty({
    description: '批量操作的id',
    example: [1, 2, 3, 4, 5],
  })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @IsArray({ message: 'common.IsArray' })
  ids: number[];

  @ApiProperty({
    description: '批量操作的显示状态',
    example: 1,
  })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @IsNumber({}, { message: 'common.IsDisplay' })
  display: number;
}
