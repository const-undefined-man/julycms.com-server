import { CreateSiteModelDto } from './create-site-model.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateSiteModelDto extends CreateSiteModelDto {
  @ApiProperty({ description: 'id', example: 1 })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @IsNumber(undefined, { message: 'common.IsNumber' })
  id: number;
}
