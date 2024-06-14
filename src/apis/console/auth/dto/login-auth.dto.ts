import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({ description: '账号', example: 'julycms1212' })
  @IsNotEmpty({ message: '账号不能为空' })
  username: string;

  @ApiProperty({ description: '密码', example: 'julycms' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;

  @ApiProperty({ description: '验证码', example: '1234' })
  @IsNotEmpty({ message: '验证码不能为空' })
  @Length(4, 4, { message: '验证码为4个字符' })
  code: string;

  codeId: string;
}
