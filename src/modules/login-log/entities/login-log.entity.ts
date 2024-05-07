import { CommonEntity } from '@app/modules/common-entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

@Entity({ orderBy: { id: 'DESC' } })
export class LoginLog extends CommonEntity {
  @ApiPropertyOptional({ description: '登录用户' })
  @Column({ type: 'varchar', comment: '登录用户', length: 32 })
  username: string | null;

  @ApiPropertyOptional({ description: 'ip地址' })
  @Column({ type: 'varchar', nullable: true, comment: 'ip地址', length: 16 })
  ip: string | null;

  @ApiPropertyOptional({ description: 'ip地址所在地区' })
  @Column({
    type: 'varchar',
    nullable: true,
    comment: 'ip地址所在地区',
    length: 64,
  })
  address: string | null;

  @ApiPropertyOptional({ description: '操作系统信息' })
  @Column({
    type: 'varchar',
    nullable: true,
    comment: '操作系统信息',
    length: 32,
  })
  os: string | null;

  @ApiPropertyOptional({ description: '浏览器信息' })
  @Column({
    type: 'varchar',
    nullable: true,
    comment: '浏览器信息',
    length: 32,
  })
  browser: string | null;

  @ApiPropertyOptional({ description: '操作结果' })
  @Column({
    type: 'tinyint',
    nullable: true,
    comment: '操作结果',
    width: 1,
    default: 1,
  })
  status: number;

  @ApiPropertyOptional({ description: '操作描述' })
  @Column({ type: 'varchar', length: 128, nullable: true, comment: '操作描述' })
  description: number | null;
}
