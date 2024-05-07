import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, Length } from 'class-validator';

export class LinkDto {
  @ApiPropertyOptional({ description: 'ID', example: 1 })
  @IsOptional()
  @IsNumber(undefined, { message: 'id必须为数字' })
  id: number;

  @ApiProperty({ description: 'url', example: 'https://www.zhuolian.tech' })
  @IsNotEmpty({ message: '链接地址不能为空' })
  @Length(1, 255, { message: '链接地址为1~255位字符' })
  url: string;

  @ApiProperty({ description: '是否追踪: 0 nofollow; 1 follow', example: 0 })
  @IsNotEmpty({ message: '是否追踪不能为空' })
  @IsNumber(undefined, { message: '是否追踪必须为数字' })
  follow: number;

  @ApiProperty({
    description: '打开方式;0 _self；1 _blank; 2 _parent; 3 _top',
    example: 0,
  })
  @IsNotEmpty({ message: '打开方式不能为空' })
  @IsNumber(undefined, { message: '打开方式必须为数字' })
  target: number;
}
