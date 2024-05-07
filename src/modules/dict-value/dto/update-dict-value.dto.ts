import { ApiProperty } from '@nestjs/swagger';
import { CreateDictValueDto } from './create-dict-value.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateDictValueDto extends CreateDictValueDto {
  @ApiProperty({ description: 'id', example: 1 })
  @IsNotEmpty({ message: 'id不能为空' })
  @IsNumber(undefined, { message: 'id为数字' })
  id: number;
}
