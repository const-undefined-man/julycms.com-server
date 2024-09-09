import { ApiProperty } from '@nestjs/swagger';
import { CreateTagDto } from './create-tag.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateTagDto extends CreateTagDto {
  @ApiProperty({ description: 'id', example: 1 })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @IsNumber(undefined, { message: 'common.IsNumber' })
  id: number;
}
