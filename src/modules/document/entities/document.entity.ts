import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Category } from '@app/modules/category/entities/category.entity';
import { CommonEntity } from '@app/modules/common-entity';
import { Tag } from '@app/modules/tag/entities/tag.entity';
import { Attachement } from '@app/modules/attachement/entities/attachement.entity';
import { Content } from './content.entity';
import { Album } from './album.entity';
import { Link } from './link.entity';
import { Counter } from '@app/modules/counter/entities/counter.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

@Entity({ orderBy: { id: 'DESC' } })
export class Document extends CommonEntity {
  @ApiPropertyOptional({ description: '标题' })
  @Column({ type: 'varchar', length: 64, comment: '标题' })
  title: string | null;

  @ApiPropertyOptional({ description: '描述' })
  @Column({ type: 'varchar', nullable: true, length: 255, comment: '描述' })
  description: string | null;

  @ApiPropertyOptional({ description: '标签', type: [Tag] })
  @ManyToMany(() => Tag, (tag) => tag.documents, {
    cascade: true,
    createForeignKeyConstraints: false,
  })
  @JoinTable()
  tags: Tag[];

  // 封面图片
  // @Column({ type: 'varchar', length: 255, nullable: true, comment: '封面图片' })
  @ApiPropertyOptional({ description: '封面图片', type: Attachement })
  @OneToOne(() => Attachement, (attachement) => attachement.document, {
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
  @Column({ type: 'tinyint', comment: '是否显示', width: 1, default: 1 })
  display: number | 1;

  @ApiPropertyOptional({ description: '阅读数' })
  @Column({ type: 'int', comment: '阅读数', unsigned: true, default: 999 })
  readNum: number | 999;

  @ApiPropertyOptional({ description: '点赞数' })
  @Column({ type: 'int', comment: '点赞数', unsigned: true, default: 999 })
  likeNum: number | 999;

  @ApiPropertyOptional({ description: '栏目' })
  @ManyToOne(() => Category, (category) => category.documents)
  category: Category;

  @ApiPropertyOptional({ description: '内容', type: Content })
  @OneToOne(() => Content, (content) => content.document, {
    cascade: true,
    createForeignKeyConstraints: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  content: Content;

  @ApiPropertyOptional({ description: '相册', type: [Album] })
  @OneToMany(() => Album, (album) => album.document, {
    cascade: true,
    createForeignKeyConstraints: false,
  })
  albums: Album[];

  @ApiPropertyOptional({ description: '链接', type: Link })
  @OneToOne(() => Link, (link) => link.document, {
    cascade: true,
    createForeignKeyConstraints: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  link: Link;

  @ApiPropertyOptional({ description: '数量', type: [Counter] })
  @OneToMany(() => Counter, (counter) => counter.document, {
    cascade: true,
    createForeignKeyConstraints: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  counter: Counter[];
}
