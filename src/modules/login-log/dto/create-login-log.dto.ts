import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsIP,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class CreateLoginLogDto {
  @ApiProperty({ description: '用户名', example: 'admin' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @MaxLength(32, { message: '用户名长度不能超过32个字符' })
  username: string;

  @ApiPropertyOptional({ description: '登录IP', example: '127.0.0.1' })
  @IsOptional()
  @IsIP(4, { message: 'IP地址格式不正确' })
  ip: string;

  @ApiPropertyOptional({ description: '登录地点', example: '内网IP' })
  @IsOptional()
  @MaxLength(64, { message: '登录地点长度不能超过64个字符' })
  address: string;

  @ApiPropertyOptional({ description: '操作系统', example: 'Windows 10' })
  @IsOptional()
  @MaxLength(32, { message: '操作系统长度不能超过32个字符' })
  os: string;

  @ApiPropertyOptional({ description: '浏览器', example: 'Chrome 80' })
  @IsOptional()
  @MaxLength(32, { message: '浏览器长度不能超过32个字符' })
  browser: string;

  @ApiProperty({ description: '操作结果', example: 1 })
  @IsNumber(undefined, { message: '操作结果必须为数字' })
  status: number;

  @ApiPropertyOptional({ description: '描述', example: '登录成功' })
  @IsOptional()
  @MaxLength(128, { message: '描述长度不能超过128个字符' })
  description: string;
}
