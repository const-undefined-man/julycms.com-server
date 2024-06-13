import { CommonEntity } from '@app/modules/common-entity';
import { Role } from '@app/modules/role/entities/role.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToMany,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity('menu', { orderBy: { listorder: 'ASC' } })
@Tree('closure-table')
export class Menu extends CommonEntity {
  @ApiPropertyOptional({ description: '类型; 0目录 1菜单 2按钮' })
  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
    comment: '类型; 0目录 1菜单 2按钮',
  })
  type: number;

  @ApiPropertyOptional({ description: '名称' })
  @Column({ type: 'varchar', length: 32, comment: '名称' })
  name: string;

  @ApiPropertyOptional({ description: '标识' })
  @Column({ type: 'varchar', nullable: true, length: 32, comment: '标识' })
  mark: string | null;

  @ApiPropertyOptional({ description: '图标名称' })
  @Column({ type: 'varchar', nullable: true, length: 32, comment: '图标名称' })
  icon: string | null;

  @ApiPropertyOptional({ description: '组件名称' })
  @Column({ type: 'varchar', nullable: true, length: 32, comment: '组件名称' })
  componentName: string | null;

  @ApiPropertyOptional({ description: '路由地址' })
  @Column({
    type: 'varchar',
    nullable: true,
    length: 128,
    default: '/',
    comment: '路由地址',
  })
  componentRoute: string;

  @ApiPropertyOptional({ description: '组件路径' })
  @Column({
    type: 'varchar',
    nullable: true,
    length: 128,
    default: 'Layout',
    comment: '组件路径',
  })
  componentPath: string | null;

  @ApiPropertyOptional({ description: '排序' })
  @Column({ type: 'smallint', nullable: true, default: 99, comment: '排序' })
  listorder: number | null;

  @ApiPropertyOptional({ description: '是否显示' })
  @Column({
    type: 'tinyint',
    nullable: true,
    width: 1,
    default: 1,
    comment: '是否显示',
  })
  display: number;

  @ApiPropertyOptional({ description: '是否快捷菜单' })
  @Column({
    type: 'tinyint',
    nullable: true,
    width: 1,
    default: 0,
    comment: '是否快捷菜单',
  })
  quickmenu: number;

  @ApiPropertyOptional({ description: '按钮/菜单风格' })
  @Column({
    type: 'varchar',
    nullable: true,
    length: 16,
    default: 'default',
    comment: '按钮/菜单风格',
  })
  style: string | null;

  @ApiPropertyOptional({ description: '子菜单' })
  @TreeChildren()
  children: Menu[];

  @ApiPropertyOptional({ description: '父级菜单' })
  @TreeParent()
  parent: Menu;

  @ApiPropertyOptional({ description: '角色', type: [Role] })
  @ManyToMany(() => Role, (role) => role.menus)
  roles: Role[];
}
