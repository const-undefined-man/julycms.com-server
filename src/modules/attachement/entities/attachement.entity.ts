import { Category } from '@app/modules/category/entities/category.entity';
import { Manager } from '@app/modules/manager/entities/manager.entity';
import { Document } from '@app/modules/document/entities/document.entity';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { Album } from '@app/modules/document/entities/album.entity';
import { PatchList } from '@app/modules/patch/entities/patch-list.entity';
import { CommonEntity } from '@app/modules/common-entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

@Entity('attachement', { orderBy: { id: 'DESC' } })
export class Attachement extends CommonEntity {
  @ApiPropertyOptional({ description: 'url' })
  @Column({ type: 'varchar', nullable: true, comment: 'url', length: 128 })
  url: string | null;

  @ApiPropertyOptional({ description: '文件大小' })
  @Column({ type: 'int', default: 0, nullable: true, comment: '文件大小' })
  size: number | null;

  @ApiPropertyOptional({ description: '文件类型' })
  @Column({ type: 'varchar', nullable: true, comment: '文件类型', length: 255 })
  mimetype: string | null;

  @ApiPropertyOptional({ description: '操作人类型；0 未知； 1 管理员；2 用户' })
  @Column({
    type: 'tinyint',
    width: 1,
    default: 1,
    nullable: true,
    comment: '操作人类型；0 未知； 1 管理员；2 用户',
  })
  operatorType: number | null;

  @ApiPropertyOptional({ description: '操作人id' })
  @Column({ nullable: true })
  operatorId: number | null;

  @ApiPropertyOptional({ description: '操作人', type: Manager })
  @ManyToOne(() => Manager, (manager) => manager.operator)
  operator: Manager;

  @ApiPropertyOptional({ description: '关联数据状态；0 未使用；1 正在使用' })
  @Column({
    type: 'tinyint',
    width: 1,
    default: 1,
    nullable: true,
    comment: '关联数据状态；0 未使用；1 正在使用',
  })
  status: number | null;

  @ApiPropertyOptional({ type: Manager })
  @OneToOne(() => Manager, (manager) => manager.avatar)
  manager: Manager;

  @ApiPropertyOptional({ type: Category })
  @OneToOne(() => Category, (category) => category.cover)
  category: Category;

  @ApiPropertyOptional({ type: Document })
  @OneToOne(() => Document, (document) => document.cover)
  document: Document;

  @ApiPropertyOptional({ type: Album })
  @OneToOne(() => Album, (album) => album.img)
  album: Album;

  @ApiPropertyOptional({ type: PatchList })
  @OneToOne(() => PatchList, (patchList) => patchList.img)
  patchList: Album;
}
