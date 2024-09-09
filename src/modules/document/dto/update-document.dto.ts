import { ApiProperty } from '@nestjs/swagger';
import { CreateDocumentDto } from './create-document.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateDocumentDto extends CreateDocumentDto {
  @ApiProperty({ description: 'id', example: 1 })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @IsNumber(undefined, { message: 'common.IsNumber' })
  id: number;
}
