import { ApiProperty } from '@nestjs/swagger';
import { CreateDictDto } from './create-dict.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateDictDto extends CreateDictDto {
  @ApiProperty({ description: 'id', example: 1 })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @IsNumber(undefined, { message: 'common.IsNumber' })
  id: number;
}
