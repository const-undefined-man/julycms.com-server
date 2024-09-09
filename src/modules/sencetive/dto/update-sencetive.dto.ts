import { ApiProperty } from '@nestjs/swagger';
import { CreateSencetiveDto } from './create-sencetive.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateSencetiveDto extends CreateSencetiveDto {
  @ApiProperty({ description: 'id', example: 1 })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @IsNumber(undefined, { message: 'common.IsNumber' })
  id: number;
}
