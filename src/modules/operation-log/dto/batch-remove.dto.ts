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
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @IsArray({ message: 'common.IsArray' })
  ids: number[];
}
