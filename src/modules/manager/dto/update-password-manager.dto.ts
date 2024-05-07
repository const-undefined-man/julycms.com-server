import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Length } from 'class-validator';

export class UpdatePasswordManagerDto {
  @ApiProperty({ description: 'id', example: 1 })
  @IsNotEmpty({ message: 'id不能为空' })
  @IsNumber(undefined, { message: 'id为数字' })
  id: number;

  @IsNotEmpty({ message: '旧密码不能为空' })
  @Length(6, 18, { message: '密码长度为6-18位' })
  password: string;

  @IsNotEmpty({ message: '新密码不能为空' })
  @Length(6, 18, { message: '密码长度为6-18位' })
  newPassword: string;
}
