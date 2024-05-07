import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class CommonListDto {
  @ApiPropertyOptional({
    default: 1,
  })
  @IsNumberString()
  @IsOptional()
  pageNo?: number;

  @ApiPropertyOptional({
    default: 10,
  })
  @IsNumberString()
  @IsOptional()
  pageSize?: number;
}
