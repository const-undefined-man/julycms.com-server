import { ApiProperty } from '@nestjs/swagger';
import { CreateDictValueDto } from './create-dict-value.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateDictValueDto extends CreateDictValueDto {
  @ApiProperty({ description: 'id', example: 1 })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @IsNumber(undefined, { message: 'common.IsNumber' })
  id: number;
}
