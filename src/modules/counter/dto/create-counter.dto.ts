import { ApiProperty } from '@nestjs/swagger';
import { countTypeEnum } from '../type';
import { IsNotEmpty } from 'class-validator';

export class CreateCounterDto {
  @ApiProperty({ description: '统计类型', type: 'enum', example: 'document' })
  @IsNotEmpty({ message: '统计类型不能为空' })
  type: countTypeEnum;

  @ApiProperty({ description: '统计对象id', example: 1 })
  @IsNotEmpty({ message: '统计对象id不能为空' })
  documentId: number;
}
