import { Category } from '@app/modules/category/entities/category.entity';
import { CommonEntity } from '@app/modules/common-entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity('site_model')
export class SiteModel extends CommonEntity {
  @ApiPropertyOptional({ description: '模型名称' })
  @Column({ type: 'varchar', unique: true, comment: '模型名称', length: 16 })
  name: string;

  @ApiPropertyOptional({ description: '模型标识' })
  @Column({ type: 'varchar', unique: true, comment: '模型标识', length: 32 })
  mark: string;

  @ApiPropertyOptional({ description: '描述' })
  @Column({ type: 'varchar', nullable: true, comment: '描述', length: 255 })
  description: string | null;

  @ApiPropertyOptional({ description: '是否显示 0 不显示；1 显示' })
  @Column('tinyint', {
    comment: '是否显示 0 不显示；1 显示',
    width: 1,
    default: 0,
  })
  display: number | 0;

  @ApiPropertyOptional({ description: '模型分类', type: Category })
  @OneToOne(() => Category, (category) => category.siteModel)
  category: Category;
}
