import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import { Manager } from '../../manager/entities/manager.entity';
export class CreateAttachementDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber(undefined, { message: 'id为数字' })
  id: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'url不能为空' })
  @MaxLength(128, { message: 'url长度最大为128个字符' })
  url: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber(undefined, { message: 'size为数字' })
  size: number;

  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(255, { message: 'mimetype长度最大为255个字符' })
  mimetype: string;

  @ApiProperty()
  @IsNumber(undefined, { message: '操作人类型为数字' })
  operatorType: number;

  @ApiPropertyOptional()
  @IsOptional()
  manager: Manager;
}
