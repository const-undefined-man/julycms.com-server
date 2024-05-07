import { DictValue } from '@app/modules/dict-value/entities/dict-value.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Length,
} from 'class-validator';
export class CreateMenuDto {
  @ApiProperty({
    description: '菜单类型；0 菜单； 1按钮',
    example: 1,
  })
  @IsNumber(undefined, { message: '菜单类型只能为数字类型' })
  type: number;

  @ApiProperty({
    description: '菜单/按钮名称',
    example: '测试菜单',
  })
  @IsNotEmpty({ message: '菜单/按钮名称不能为空' })
  @Length(1, 32, { message: '名称为1~32位字符' })
  name: string;

  @ApiPropertyOptional({
    description: '标识',
    example: 'tag',
  })
  @IsOptional()
  @IsNotEmpty({ message: '标识不能为空' })
  @Length(1, 32, { message: '标识为1~32位字符' })
  mark: string;

  @ApiPropertyOptional({
    description: '菜单图标',
    example: 'el-icon-aaa',
  })
  @IsOptional()
  icon?: string;

  @ApiPropertyOptional({
    description: '组件名称',
    example: '菜单',
  })
  @IsOptional()
  componentName?: string;

  @ApiPropertyOptional({
    description: '路由地址',
    example: '/menu1',
  })
  @IsOptional()
  @IsNotEmpty({ message: '路由地址不能为空' })
  componentRoute: string;

  @ApiPropertyOptional({
    description: '组件地址',
    example: '/menu/index.vue',
  })
  @IsOptional()
  @IsNotEmpty({ message: '组件地址不能为空' })
  componentPath: string;

  @ApiPropertyOptional({
    description: '排序',
    example: 1,
  })
  @IsOptional()
  listorder: number;

  @ApiPropertyOptional({
    description: '是否显示；0 隐藏；1 显示',
    example: 1,
    default: 1,
    type: 'enum',
    enum: [0, 1],
  })
  @IsOptional()
  display: number;

  @ApiPropertyOptional({ description: '菜单风格', example: 'primary' })
  @IsOptional()
  @Length(1, 16, { message: '风格为1-16位字符' })
  style: string;

  @ApiPropertyOptional({
    description: '操作按钮',
    example: [{ id: 1, name: '添加' }],
  })
  @IsArray({ message: '操作按钮为数组' })
  @IsOptional()
  actions: DictValue[];

  @ApiPropertyOptional({
    description: '父级菜单',
    example: [{ id: 1 }],
  })
  @IsNumber(undefined, { message: '父级菜单为数字' })
  parent: number;
}
