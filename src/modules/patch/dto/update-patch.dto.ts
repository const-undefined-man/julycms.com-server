import { ApiProperty } from '@nestjs/swagger';
import { CreatePatchDto } from './create-patch.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdatePatchDto extends CreatePatchDto {
  @ApiProperty({ description: 'id', example: 1 })
  @IsNotEmpty({ message: 'id不能为空' })
  @IsNumber(undefined, { message: 'id为数字' })
  id: number;
}
