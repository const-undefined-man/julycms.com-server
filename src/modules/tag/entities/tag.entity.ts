import { CommonEntity } from '@app/modules/common-entity';
import { Document } from '@app/modules/document/entities/document.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
} from 'typeorm';
import { pinyin } from 'pinyin-pro';
import { ApiPropertyOptional } from '@nestjs/swagger';

@Entity('tag', { orderBy: { id: 'DESC' } })
export class Tag extends CommonEntity {
  @ApiPropertyOptional({ description: 'tag名称' })
  @Column({ type: 'varchar', unique: true, comment: 'tag名称', length: 20 })
  name: string | null;

  @ApiPropertyOptional({ description: '拼音' })
  @Column({ type: 'varchar', nullable: true, comment: '拼音', length: 64 })
  pinyin: string | null;

  @ApiPropertyOptional({ description: '首字母' })
  @Column({ type: 'char', nullable: true, comment: '首字母', length: 1 })
  letter: string | null;

  @ApiPropertyOptional({ description: 'SEO标题' })
  @Column({ type: 'varchar', length: 128, nullable: true, comment: 'SEO标题' })
  seoTitle: string | null;

  @ApiPropertyOptional({ description: 'SEO关键词' })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'SEO关键词',
  })
  seoKeywords: string | null;

  @ApiPropertyOptional({ description: 'SEO描述' })
  @Column({ type: 'varchar', length: 255, nullable: true, comment: 'SEO描述' })
  seoDescription: string | null;

  @ApiPropertyOptional({ description: '是否显示 0 不显示；1 显示' })
  @Column('tinyint', {
    comment: '是否显示 0 不显示；1 显示',
    width: 1,
    default: 1,
  })
  display: number | 1;

  @ApiPropertyOptional({ description: '文档数量' })
  @Column({ type: 'smallint', nullable: true, default: 0, comment: '文档数量' })
  count: number | null;

  @ApiPropertyOptional({ description: '关联文档', type: [Document] })
  @ManyToMany(() => Document, (document) => document.tags)
  documents: Document[];

  @BeforeInsert()
  @BeforeUpdate()
  generatePinyin() {
    if (!this.name) {
      return;
    }

    this.pinyin = pinyin(this.name, { toneType: 'none' });
    this.letter = this.pinyin.charAt(0);
  }
}
