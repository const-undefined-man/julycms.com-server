import { DictValue } from '@app/modules/dict-value/entities/dict-value.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsAlpha,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Length,
  MaxLength,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateDictDto {
  @ApiProperty({ description: '字典名称', example: '性别' })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @Length(10, 16, { message: i18nValidationMessage('common.Length') })
  name: string;

  @ApiProperty({ description: '字典标识', example: 'gender' })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @IsAlpha('en-US', { message: 'common.IsAlpha' })
  @Length(1, 16, { message: 'common.Length' })
  type: string;

  @ApiPropertyOptional({ description: '是否显示；0 隐藏；1 显示', example: 1 })
  @IsNumber(undefined, { message: 'common.IsNumber' })
  @IsOptional()
  display?: number;

  @ApiPropertyOptional({ description: '字典备注' })
  @MaxLength(255, { message: 'common.MaxLength' })
  @IsOptional()
  remark?: string;

  @ApiPropertyOptional({ description: '字典值', example: '' })
  @IsOptional()
  @IsArray({ message: 'common.IsArray' })
  values?: DictValue[];
}
