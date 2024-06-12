import { CommonEntity } from '../../common-entity';
import { DictValue } from '@app/modules/dict-value/entities/dict-value.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Dict extends CommonEntity {
  @ApiPropertyOptional({ example: '字典名称' })
  @Column({ type: 'varchar', length: 16, unique: true, comment: '名称' })
  name: string;

  @ApiPropertyOptional({ example: '字典标识' })
  @Column({ type: 'varchar', length: 16, unique: true, comment: '标识' })
  type: string;

  @ApiPropertyOptional({ description: '是否显示', example: 1 })
  @Column({ type: 'tinyint', width: 1, default: 1, comment: '是否显示' })
  display: number | 1;

  @ApiPropertyOptional({ description: '备注' })
  @Column({ type: 'varchar', length: 255, nullable: true, comment: '备注' })
  remark: string | null;

  @ApiPropertyOptional({ description: '字典值', type: [DictValue] })
  @OneToMany(() => DictValue, (values) => values.dict, {
    cascade: true,
    createForeignKeyConstraints: false,
  })
  values: DictValue[];
}
