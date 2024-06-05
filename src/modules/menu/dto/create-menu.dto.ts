import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
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
  @MaxLength(32, { message: '菜单图标最大为32个字符' })
  icon?: string;

  @ApiPropertyOptional({
    description: '组件名称',
    example: '菜单',
  })
  @IsOptional()
  @MaxLength(32, { message: '组件名称最大为32个字符' })
  componentName?: string;

  @ApiPropertyOptional({
    description: '路由地址',
    example: '/menu1',
  })
  @IsOptional()
  @MaxLength(128, { message: '路由地址最大为128个字符' })
  componentRoute: string;

  @ApiPropertyOptional({
    description: '组件路径',
    example: '/menu/index.vue',
  })
  @IsOptional()
  @MaxLength(128, { message: '组件路径最大为128个字符' })
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

  @ApiPropertyOptional({ description: '按钮/菜单风格', example: 'primary' })
  @IsOptional()
  @Length(0, 16, { message: '风格最大为16个字符' })
  style: string;

  @ApiPropertyOptional({
    description: '父级菜单',
    example: [{ id: 1 }],
  })
  @IsOptional()
  @IsNumber(undefined, { message: '父级菜单为数字' })
  parent: number;
}
