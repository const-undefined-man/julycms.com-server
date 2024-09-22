
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, MaxLength } from 'class-validator';
import { QueryDto } from '@app/modules/query-dto';

export class ParamDocumentDto {
  @ApiProperty({ description: '栏目ID', example: 1 })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @IsNumberString(undefined, { message: 'common.IsNumber' })
  catId: number;

  @ApiProperty({ description: '模型', example: 'page' })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @MaxLength(32, { message: 'common.MaxLength' })
  modelMark: string;
}
