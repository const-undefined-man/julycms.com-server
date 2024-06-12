import {
  Entity,
  Column,
  Timestamp,
  BeforeInsert,
  BeforeUpdate,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { Role } from '@app/modules/role/entities/role.entity';
import { CommonEntity } from '../../common-entity';
import { Patch } from '@app/modules/patch/entities/patch.entity';
import { Attachement } from '@app/modules/attachement/entities/attachement.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

@Entity('manager')
export class Manager extends CommonEntity {
  @ApiPropertyOptional({ description: '账号', example: 'admin' })
  @Column({ type: 'varchar', unique: true, comment: '账号', length: 32 })
  username: string;

  @ApiPropertyOptional({ description: '密码', example: '123456' })
  @Column({
    type: 'varchar',
    name: 'password',
    comment: '密码',
    length: 64,
    select: false,
  })
  password: string;

  @ApiPropertyOptional({ description: '是否启用', example: 1 })
  @Column({
    type: 'tinyint',
    comment: '是否超级管理员， 1 是； 0 否',
    width: 1,
    default: 0,
  })
  isAdmin: number;

  @ApiPropertyOptional({ description: '头像', type: Attachement })
  @OneToOne(() => Attachement, (attachement) => attachement.manager, {
    cascade: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  avatar: Attachement;

  @ApiPropertyOptional({ description: '真实姓名', example: '张三' })
  @Column({ type: 'varchar', nullable: true, comment: '真实姓名', length: 16 })
  realname: string;

  @ApiPropertyOptional({ description: '邮箱', example: '123456@qq.com' })
  @Column({ type: 'varchar', nullable: true, comment: '邮箱', length: 32 })
  email: string | null;

  @ApiPropertyOptional({ description: '电话号码', example: '1388888888' })
  @Column({ type: 'varchar', nullable: true, comment: '电话号码', length: 16 })
  phoneNumber: string | null;

  @ApiPropertyOptional({
    description: '最后登录时间',
    example: '2022-01-01 00:00:00',
  })
  @Column({
    type: 'timestamp',
    nullable: true,
    comment: '最后登录时间',
  })
  lastLoginTime: Timestamp;

  @ApiPropertyOptional({ description: '最后登录Ip' })
  @Column({
    type: 'varchar',
    nullable: true,
    comment: '最后登录Ip',
    length: 32,
  })
  lastLoginIp: string | null;

  @ApiPropertyOptional({ description: '角色', type: [Role] })
  @ManyToMany(() => Role, (role) => role.managers, {
    createForeignKeyConstraints: false,
    cascade: true,
  })
  @JoinTable()
  roles: Role[];

  @ApiPropertyOptional({ description: '关联碎片', type: Patch })
  @OneToOne(() => Patch, (patch) => patch.manager)
  patch: Patch;

  @ApiPropertyOptional({ description: '关联附件', type: [Attachement] })
  @OneToMany(() => Attachement, (attachement) => attachement.operator, {
    createForeignKeyConstraints: false,
    cascade: true,
  })
  operator: Attachement[];

  @BeforeInsert()
  @BeforeUpdate()
  async encryptPassword() {
    if (!this.password) {
      return;
    }
    this.password = await bcryptjs.hashSync(this.password, 10);
  }
}
