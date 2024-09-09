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
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  username: string;

  @ApiProperty({ description: '密码', example: 'admin' })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  password: string;

  @ApiPropertyOptional({ description: '头像-附件ID' })
  @IsOptional()
  avatar?: Attachement;

  @ApiPropertyOptional({ description: '真实姓名', example: '保密' })
  @IsOptional()
  realname?: string;

  @ApiPropertyOptional({ description: '邮箱', example: 'admin@julycms.com' })
  @IsOptional()
  @IsEmail(undefined, { message: 'common.IsFormat' })
  email?: string;

  @ApiPropertyOptional({ description: '手机号码', example: '13311112222' })
  @IsOptional()
  @IsPhoneNumber('CN', { message: 'common.IsFormat' })
  @Length(11, 11, { message: 'common.Length' })
  phoneNumber?: string;

  @ApiPropertyOptional({ description: '最后登录Ip', example: '127.0.0.1' })
  @IsOptional()
  lastLoginIp?: string;

  @ApiPropertyOptional({ description: '关联的角色', example: [{ id: 1 }] })
  @IsOptional({ message: 'common.IsNotEmpty' })
  @IsArray({ message: 'common.IsFormat' })
  roles?: Role[];
}
