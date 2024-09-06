import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class BatchRemoveDto {
  @ApiProperty({
    description: 'id数组',
    type: 'array',
    items: {
      type: 'number',
    },
  })
  @IsNotEmpty({ message: 'ids不能为空' })
  @IsArray({ message: 'ids必须是一个数组' })
  ids: number[];
}
