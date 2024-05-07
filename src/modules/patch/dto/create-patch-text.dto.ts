import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreatePatchTextDto {
  @ApiPropertyOptional({ description: '文本id', example: 1 })
  @IsOptional()
  id: number;

  @ApiPropertyOptional({
    description: '文本内容',
    example: '这是要修改的文本内容',
  })
  @IsOptional()
  content: string;
}
