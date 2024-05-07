import { ApiProperty } from '@nestjs/swagger';
import { CreateDocumentDto } from './create-document.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateDocumentDto extends CreateDocumentDto {
  @ApiProperty({ description: 'id', example: 1 })
  @IsNotEmpty({ message: 'id不能为空' })
  @IsNumber(undefined, { message: 'id为数字' })
  id: number;
}
