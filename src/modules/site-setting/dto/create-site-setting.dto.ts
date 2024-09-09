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
  @IsNumber(undefined, { message: 'common.IsNumber' })
  type: number;

  @ApiProperty({ description: '名称', example: '名称' })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @Length(1, 32, { message: 'common.MinMax' })
  name: string;

  @ApiProperty({ description: '键名', example: 'title' })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @Length(1, 32, { message: 'common.MinMax' })
  label: string;

  @ApiPropertyOptional({ description: '值', example: 'julycms' })
  @MaxLength(255, { message: 'common.MaxLength' })
  @IsOptional()
  value?: string;
}
