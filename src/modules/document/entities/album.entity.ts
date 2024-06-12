import { CommonEntity } from '../../common-entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Document } from './document.entity';
import { Attachement } from '@app/modules/attachement/entities/attachement.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
export class Album extends CommonEntity {
  @ApiPropertyOptional({ description: '排序' })
  @Column({ type: 'smallint', default: 99, comment: '排序' })
  listorder: number | null;

  @ApiPropertyOptional({ description: '图片', type: Attachement })
  @OneToOne(() => Attachement, (attachement) => attachement.album, {
    cascade: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  img: Attachement;

  @ApiPropertyOptional({ description: '图片描述' })
  @Column({
    type: 'varchar',
    length: '255',
    nullable: true,
    comment: '图片描述',
  })
  description: string | null;

  @ApiPropertyOptional({ description: '文档', type: Document })
  @ManyToOne(() => Document, (document) => document.albums)
  document: Document;
}
