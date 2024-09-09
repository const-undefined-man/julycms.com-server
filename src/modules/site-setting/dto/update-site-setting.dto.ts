import { ApiProperty } from '@nestjs/swagger';
import { CreateSiteSettingDto } from './create-site-setting.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateSiteSettingDto extends CreateSiteSettingDto {
  @ApiProperty({ description: 'id', example: 1 })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @IsNumber(undefined, { message: 'common.IsNumber' })
  id: number;
}
