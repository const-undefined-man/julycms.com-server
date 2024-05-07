import { Attachement } from '@app/modules/attachement/entities/attachement.entity';
import { Role } from '@app/modules/role/entities/role.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  Length,
} from 'class-validator';

export class CreateManagerDto {
  @ApiProperty({ description: '账号', example: 'admin' })
  @IsNotEmpty({ message: '账号不能为空' })
  username: string;

  @ApiProperty({ description: '密码', example: 'admin' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;

  @ApiPropertyOptional({ description: '附件-头像' })
  @IsOptional()
  attachement: Attachement;

  @ApiPropertyOptional({ description: '真实姓名', example: '保密' })
  @IsOptional()
  realname?: string;

  @ApiPropertyOptional({ description: '邮箱', example: 'admin@julycms.com' })
  @IsOptional()
  @IsEmail(undefined, { message: '邮箱格式错误' })
  email?: string;

  @ApiPropertyOptional({ description: '手机号码', example: '13311112222' })
  @IsOptional()
  @IsPhoneNumber('CN', { message: '手机号码格式错误' })
  @Length(11, 11, { message: '手机号码为11位' })
  phoneNumber?: string;

  @ApiPropertyOptional({ description: '最后登录Ip', example: '127.0.0.1' })
  @IsOptional()
  lastLoginIp?: string;

  @ApiPropertyOptional({ description: '关联的角色', example: [{ id: 1 }] })
  @IsOptional({ message: '关联的角色不能为空' })
  @IsArray({ message: '关联的角色格式错误' })
  roles: Role[];
}
