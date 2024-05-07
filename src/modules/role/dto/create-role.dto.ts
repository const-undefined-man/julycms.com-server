import { Menu } from '@app/modules/menu/entities/menu.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ description: '角色名称', example: '角色1' })
  @IsNotEmpty({ message: '角色名称不能为空' })
  name: string;

  @ApiPropertyOptional({ description: '角色描述', example: '测试角色' })
  @IsOptional()
  description: string;

  @ApiPropertyOptional({
    description: '角色启用状态, 0 禁用；1 启用',
    example: 1,
  })
  @IsNumber(undefined, { message: '状态为数字' })
  @IsOptional()
  status: number;

  @ApiPropertyOptional({ description: '角色关联权限', example: [{ id: 1 }] })
  @IsArray({ message: '关联权限只能是数组格式' })
  @IsOptional()
  menus: Menu[];
}
