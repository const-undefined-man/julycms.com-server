import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Length } from 'class-validator';

export class UpdatePasswordManagerDto {
  @ApiProperty({ description: 'id', example: 1 })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @IsNumber(undefined, { message: 'common.IsNumber' })
  id: number;

  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @Length(6, 18, { message: 'common.MinMax' })
  password: string;

  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @Length(6, 18, { message: 'common.MinMax' })
  newPassword: string;
}
