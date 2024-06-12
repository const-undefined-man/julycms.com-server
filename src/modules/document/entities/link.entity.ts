import { CommonEntity } from '../../common-entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { Document } from './document.entity';

@Entity()
export class Link extends CommonEntity {
  @Column({ type: 'smallint', default: 99, comment: '排序' })
  listorder: number | null;

  @Column({ type: 'varchar', length: '255', comment: 'url' })
  url: string | null;

  @Column({
    type: 'tinyint',
    comment: '是否追踪: 0 nofollow; 1 follow',
    width: 1,
    default: 0,
  })
  follow: number | 0;

  @Column({
    type: 'tinyint',
    comment: '打开方式: 0 _self；1 _blank; 2 _parent; 3 _top',
    width: 1,
    default: 0,
  })
  target: number | 0;

  @OneToOne(() => Document, (document) => document.link)
  document: Document;
}
