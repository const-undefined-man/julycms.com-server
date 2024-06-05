import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateSiteSettingDto {
  @ApiProperty({ description: '类型', example: 0 })
  @IsNumber(undefined, { message: '类型只能是数字' })
  type: number;

  @ApiProperty({ description: '名称', example: '名称' })
  @IsNotEmpty({ message: '名称不能为空' })
  @Length(1, 32, { message: '名称为1~32个字符' })
  name: string;

  @ApiProperty({ description: '键名', example: 'title' })
  @IsNotEmpty({ message: '键名不能为空' })
  @Length(1, 32, { message: '键名为1~32个字符' })
  label: string;

  @ApiPropertyOptional({ description: '值', example: 'julycms' })
  @MaxLength(255, { message: '值最大为255个字符' })
  @IsOptional()
  value: string;
}
