import { CreateMenuDto } from './create-menu.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateMenuDto extends CreateMenuDto {
  @ApiProperty({ description: 'id', example: 1 })
  @IsNotEmpty({ message: 'id不能为空' })
  @IsNumber(undefined, { message: 'id为数字' })
  id: number;
}
