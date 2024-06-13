import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Manager } from '@app/modules/manager/entities/manager.entity';
import { CommonEntity } from '@app/modules/common-entity';
import { Menu } from '@app/modules/menu/entities/menu.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

@Entity('role')
export class Role extends CommonEntity {
  @ApiPropertyOptional({ description: '角色名称' })
  @Column({ type: 'varchar', unique: true, comment: '角色名称', length: 32 })
  name: string;

  @ApiPropertyOptional({ description: '角色描述' })
  @Column({ type: 'varchar', nullable: true, comment: '角色描述', length: 255 })
  description: string | null;

  @ApiPropertyOptional({ description: '启用状态, 0 禁用；1 启用' })
  @Column({
    type: 'tinyint',
    nullable: true,
    width: 1,
    comment: '启用状态, 0 禁用；1 启用',
  })
  status: number;

  @ApiPropertyOptional({ description: '角色拥有的管理员', type: [Manager] })
  @ManyToMany(() => Manager, (manager) => manager.roles)
  managers: Manager[];

  @ApiPropertyOptional({ description: '角色拥有的菜单', type: [Menu] })
  @ManyToMany(() => Menu, (menu) => menu.roles, {
    createForeignKeyConstraints: false,
    cascade: true,
  })
  @JoinTable()
  menus: Menu[];
}
