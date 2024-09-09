import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, Length } from 'class-validator';

export class LinkDto {
  @ApiPropertyOptional({ description: 'ID', example: 1 })
  @IsOptional()
  @IsNumber(undefined, { message: 'common.IsNumber' })
  id?: number;

  @ApiProperty({ description: 'url', example: 'https://www.zhuolian.tech' })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @Length(1, 255, { message: 'common.MinMax' })
  url: string;

  @ApiProperty({ description: '是否追踪: 0 nofollow; 1 follow', example: 0 })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @IsNumber(undefined, { message: 'common.IsNumber' })
  follow: number;

  @ApiProperty({
    description: '打开方式;0 _self；1 _blank; 2 _parent; 3 _top',
    example: 0,
  })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @IsNumber(undefined, { message: 'common.IsNumber' })
  target: number;
}
