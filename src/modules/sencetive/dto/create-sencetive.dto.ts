import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class CreateSencetiveDto {
  @ApiProperty({
    description: '敏感词',
    example: '你大爷',
  })
  @IsNotEmpty({ message: '敏感词不能为空' })
  word: string;

  @ApiProperty({
    description: '敏感词的替换词',
    example: '*',
  })
  @IsOptional({ message: '替换词不能为空' })
  replaceWord: string;

  @IsNumber(undefined, { message: '分类不能为空' })
  @Min(0, { message: '分类最小为0' })
  @Max(4, { message: '分类最大为4' })
  classify: number;
}
