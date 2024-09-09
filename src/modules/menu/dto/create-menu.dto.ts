import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Length,
  MaxLength,
} from 'class-validator';
export class CreateMenuDto {
  @ApiProperty({
    description: '菜单类型；0 菜单； 1按钮',
    example: 1,
  })
  @IsNumber(undefined, { message: 'common.IsNumber' })
  type: number;

  @ApiProperty({
    description: '菜单/按钮名称',
    example: '测试菜单',
  })
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @Length(1, 32, { message: 'common.MinMax' })
  name: string;

  @ApiPropertyOptional({
    description: '标识',
    example: 'tag',
  })
  @IsOptional()
  @IsNotEmpty({ message: 'common.IsNotEmpty' })
  @Length(1, 32, { message: 'common.MinMax' })
  mark?: string;

  @ApiPropertyOptional({
    description: '菜单图标',
    example: 'el-icon-aaa',
  })
  @IsOptional()
  @MaxLength(32, { message: 'common.MaxLength' })
  icon?: string;

  @ApiPropertyOptional({
    description: '组件名称',
    example: '菜单',
  })
  @IsOptional()
  @MaxLength(32, { message: 'common.MaxLength' })
  componentName?: string;

  @ApiPropertyOptional({
    description: '路由地址',
    example: '/menu1',
  })
  @IsOptional()
  @MaxLength(128, { message: 'common.MaxLength' })
  componentRoute?: string;

  @ApiPropertyOptional({
    description: '组件路径',
    example: '/menu/index.vue',
  })
  @IsOptional()
  @MaxLength(128, { message: 'common.MaxLength' })
  componentPath?: string;

  @ApiPropertyOptional({
    description: '排序',
    example: 1,
  })
  @IsOptional()
  listorder?: number;

  @ApiPropertyOptional({
    description: '是否显示；0 隐藏；1 显示',
    example: 1,
    default: 1,
    type: 'enum',
    enum: [0, 1],
  })
  @IsOptional()
  display?: number;

  @ApiPropertyOptional({ description: '按钮/菜单风格', example: 'primary' })
  @IsOptional()
  @MaxLength(16, { message: 'common.MaxLength' })
  style?: string;

  @ApiProperty({ description: '菜单语言', example: '{en_US: "Menu"}' })
  @IsJSON()
  langs: string;

  @ApiPropertyOptional({
    description: '父级菜单',
    example: [{ id: 1 }],
  })
  @IsOptional()
  @IsNumber(undefined, { message: 'common.IsNumber' })
  parent?: number;
}
