import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({ description: '账号', example: 'julycms1212' })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  username: string;

  @ApiProperty({ description: '密码', example: 'julycms' })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  password: string;

  @ApiProperty({ description: '验证码', example: '1234' })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @Length(4, 4, { message: 'common.Length' })
  code: string;

  codeId: string;
}
