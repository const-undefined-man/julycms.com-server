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

export class CreateDictDto {
  @ApiProperty({ description: '字典名称', example: '性别' })
  @IsNotEmpty({ message: '字典名称不能为空' })
  @Length(1, 16, { message: '字典名称为1~16位字符' })
  name: string;

  @ApiProperty({ description: '字典标识', example: 'gender' })
  @IsNotEmpty({ message: '字典标识不能为空' })
  @IsAlpha('en-US', { message: '字典标识只能是字母' })
  @Length(1, 16, { message: '字典标识为1~16位字符' })
  type: string;

  @ApiPropertyOptional({ description: '是否显示；0 隐藏；1 显示', example: 1 })
  @IsNumber(undefined, { message: '显示状态只能是数字' })
  @IsOptional()
  display: number;

  @ApiPropertyOptional({ description: '字典备注' })
  @MaxLength(255, { message: '字典备注最大为255位字符' })
  @IsOptional()
  remark: string;

  @ApiPropertyOptional({ description: '字典值', example: '' })
  @IsOptional()
  @IsArray({ message: '字典值为数组' })
  values: DictValue[];
}
