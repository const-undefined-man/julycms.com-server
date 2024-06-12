import { Attachement } from '@app/modules/attachement/entities/attachement.entity';
import { CommonEntity } from '../../common-entity';
import { Document } from '@app/modules/document/entities/document.entity';
import { SiteModel } from '@app/modules/site-model/entities/site-model.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  Entity,
  Tree,
  TreeChildren,
  TreeParent,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('category', { orderBy: { listorder: 'ASC' } })
@Tree('closure-table')
export class Category extends CommonEntity {
  @ApiPropertyOptional({ description: '栏目名称' })
  @Column({ type: 'varchar', unique: true, length: 64, comment: '栏目名称' })
  catname: string;

  @ApiPropertyOptional({ description: '栏目名称英文' })
  @Column({
    type: 'varchar',
    length: 64,
    nullable: true,
    comment: '栏目名称英文',
  })
  catnameEn: string;

  @ApiPropertyOptional({ description: '栏目目录' })
  @Column({ type: 'varchar', length: 64, unique: true, comment: '栏目目录' })
  catdir: string;

  @ApiPropertyOptional({ description: '栏目描述' })
  @Column({ type: 'varchar', length: 255, nullable: true, comment: '栏目描述' })
  description: string | null;

  @ApiPropertyOptional({ description: '栏目icon' })
  @Column({ type: 'varchar', length: 64, nullable: true, comment: '栏目icon' })
  icon: string | null;

  @ApiPropertyOptional({ description: '栏目图片icon', type: Attachement })
  @OneToOne(() => Attachement, (attachement) => attachement.categoryImgIcon, {
    cascade: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  imgIcon: Attachement;

  // @Column({ type: 'varchar', length: 255, nullable: true, comment: '栏目封面' })
  @ApiPropertyOptional({ description: '栏目封面', type: Attachement })
  @OneToOne(() => Attachement, (attachement) => attachement.category, {
    cascade: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  cover: Attachement;

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

  @ApiPropertyOptional({ description: '是否显示' })
  @Column({
    type: 'tinyint',
    nullable: true,
    comment: '是否显示',
    width: 1,
    default: 1,
  })
  display: number | 1;

  @ApiPropertyOptional({ description: '链接地址' })
  @Column({
    type: 'varchar',
    nullable: true,
    length: '255',
    comment: '链接地址',
  })
  linkUrl: string | null;

  @ApiPropertyOptional({ description: '排序' })
  @Column({ type: 'smallint', nullable: true, default: 99, comment: '排序' })
  listorder: number | null;

  @ApiPropertyOptional({ description: '文档数量' })
  @Column({ type: 'smallint', nullable: true, default: 0, comment: '文档数量' })
  count: number | null;

  @ApiPropertyOptional()
  @TreeChildren()
  children: Category[];

  @ApiPropertyOptional()
  @TreeParent()
  parent: Category;

  @ApiPropertyOptional({ description: '站点模型', type: SiteModel })
  @OneToOne(() => SiteModel, (siteModel) => siteModel.category, {
    cascade: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  siteModel: SiteModel;

  @ApiPropertyOptional({ description: '文档', type: [Document] })
  @OneToMany(() => Document, (document) => document.category, {
    cascade: true,
    createForeignKeyConstraints: false,
  })
  documents: Document[];
}
