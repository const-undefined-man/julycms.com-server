import { CreateManagerDto } from './create-manager.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateManagerDto extends CreateManagerDto {
  @ApiProperty({ description: 'id', example: 1 })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @IsNumber(undefined, { message: 'common.IsNumber' })
  id: number;

  @ApiPropertyOptional({ description: '密码', example: 'admin' })
  @IsOptional()
  password: string;
}
