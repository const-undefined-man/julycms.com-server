import { Menu } from '@app/modules/menu/entities/menu.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ description: '角色名称', example: '角色1' })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @MaxLength(32, { message: 'common.MaxLength' })
  name: string;

  @ApiPropertyOptional({ description: '角色描述', example: '测试角色' })
  @IsOptional()
  @MaxLength(255, { message: 'common.MaxLength' })
  description?: string;

  @ApiPropertyOptional({
    description: '角色启用状态, 0 禁用；1 启用',
    example: 1,
  })
  @IsNumber(undefined, { message: 'common.IsNumber' })
  @IsOptional()
  display?: number;

  @ApiPropertyOptional({ description: '角色关联权限', example: [{ id: 1 }] })
  @IsArray({ message: 'common.IsArray' })
  @IsOptional()
  menus?: Menu[];
}
