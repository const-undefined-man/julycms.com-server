import { CreateMenuDto } from './create-menu.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateMenuDto extends CreateMenuDto {
  @ApiProperty({ description: 'id', example: 1 })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @IsNumber(undefined, { message: 'common.IsNumber' })
  id: number;
}
