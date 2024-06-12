import { CommonEntity } from '../../common-entity';
import { Dict } from '@app/modules/dict/entities/dict.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ orderBy: { listorder: 'ASC' } })
export class DictValue extends CommonEntity {
  @ApiPropertyOptional({ description: '枚举名称' })
  @Column({ type: 'varchar', length: 16, unique: true, comment: '枚举名称' })
  label: string;

  @ApiPropertyOptional({ description: '枚举值' })
  @Column({ type: 'varchar', length: 32, comment: '枚举值' })
  value: string | null;

  @ApiPropertyOptional({ description: '颜色风格' })
  @Column({ type: 'varchar', length: 16, comment: '颜色风格' })
  style: string | null;

  @ApiPropertyOptional({ description: '是否显示' })
  @Column({ type: 'tinyint', width: 1, default: 1, comment: '是否显示' })
  display: number | 1;

  @ApiPropertyOptional({ description: '排序' })
  @Column({ type: 'tinyint', unsigned: true, default: 1, comment: '排序' })
  listorder: number | 1;

  @ApiPropertyOptional({ description: '字典', type: Dict })
  @ManyToOne(() => Dict, (dict) => dict.values)
  dict: Dict;
}
