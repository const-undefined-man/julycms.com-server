import { CommonEntity } from '../../common-entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { countTypeEnum } from '../type';
import { Document } from '@app/modules/document/entities/document.entity';

@Entity()
export class Counter extends CommonEntity {
  @Column({
    type: 'enum',
    comment: '统计类型',
    enum: ['document'],
    default: 'document',
  })
  type: countTypeEnum;

  @Column({ nullable: true })
  documentId: number;

  @ManyToOne(() => Document, (document) => document.counter)
  document: Document;
}
