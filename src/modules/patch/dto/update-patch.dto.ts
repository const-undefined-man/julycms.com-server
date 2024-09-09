import { ApiProperty } from '@nestjs/swagger';
import { CreatePatchDto } from './create-patch.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdatePatchDto extends CreatePatchDto {
  @ApiProperty({ description: 'id', example: 1 })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @IsNumber(undefined, { message: 'common.IsNumber' })
  id: number;
}
