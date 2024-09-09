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
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @MaxLength(32, { message: 'common.MaxLength' })
  username: string;

  @ApiPropertyOptional({ description: '登录IP', example: '127.0.0.1' })
  @IsOptional()
  @IsIP(4, { message: 'common.IsFormat' })
  ip?: string;

  @ApiPropertyOptional({ description: '登录地点', example: '内网IP' })
  @IsOptional()
  @MaxLength(64, { message: 'common.MaxLength' })
  address?: string;

  @ApiPropertyOptional({ description: '操作系统', example: 'Windows 10' })
  @IsOptional()
  @MaxLength(32, { message: 'common.MaxLength' })
  os?: string;

  @ApiPropertyOptional({ description: '浏览器', example: 'Chrome 80' })
  @IsOptional()
  @MaxLength(32, { message: 'common.MaxLength' })
  browser?: string;

  @ApiProperty({ description: '操作结果', example: 1 })
  @IsNumber(undefined, { message: 'common.IsNumber' })
  status: number;

  @ApiPropertyOptional({ description: '描述', example: '登录成功' })
  @IsOptional()
  @MaxLength(128, { message: 'common.MaxLength' })
  description?: string;
}
