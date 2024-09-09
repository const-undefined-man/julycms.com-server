import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class CreateSencetiveDto {
  @ApiProperty({ description: '敏感词', example: '你大爷' })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  word: string;

  @ApiPropertyOptional({ description: '敏感词的替换词', example: '*' })
  @IsOptional({ message: 'common.IsNotEmpty' })
  replaceWord?: string;

  @IsNumber(undefined, { message: 'common.IsNotEmpty' })
  @Min(0, { message: 'common.MinNumber' })
  @Max(4, { message: 'common.MaxNumber' })
  classify: number;
}
