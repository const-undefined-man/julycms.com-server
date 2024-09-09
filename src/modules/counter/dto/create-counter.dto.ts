import { ApiProperty } from '@nestjs/swagger';
import { countTypeEnum } from '../type';
import { IsNotEmpty } from 'class-validator';

export class CreateCounterDto {
  @ApiProperty({ description: '统计类型', type: 'enum', example: 'document' })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  type: countTypeEnum;

  @ApiProperty({ description: '统计对象id', example: 1 })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  documentId: number;
}
