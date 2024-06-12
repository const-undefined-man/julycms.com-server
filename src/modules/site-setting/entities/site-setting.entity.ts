import { CommonEntity } from '../../common-entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

@Entity('site_setting')
export class SiteSetting extends CommonEntity {
  @ApiPropertyOptional({ description: '类型;0:基本信息' })
  @Column({
    type: 'smallint',
    comment: '类型;0:基本信息',
  })
  type: number | 0;

  @ApiPropertyOptional({ description: '键' })
  @Column({ type: 'varchar', length: 32, comment: '键' })
  label: string | null;

  @ApiPropertyOptional({ description: '名称' })
  @Column({ type: 'varchar', length: 32, comment: '名称' })
  name: string | null;

  @ApiPropertyOptional({ description: '值' })
  @Column({ type: 'varchar', nullable: true, length: 255, comment: '值' })
  value: string | null;
}
