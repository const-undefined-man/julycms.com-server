import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import { Manager } from '../../manager/entities/manager.entity';
export class CreateAttachementDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber(undefined, { message: 'common.IsNumber' })
  id?: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @MaxLength(128, { message: 'common.MaxLength' })
  url: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber(undefined, { message: 'common.IsNumber' })
  size?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(255, { message: 'common.MaxLength' })
  mimetype?: string;

  @ApiProperty()
  @IsNumber(undefined, { message: 'common.IsNumber' })
  operatorType: number;

  @ApiPropertyOptional()
  @IsOptional()
  manager?: Manager;
}
