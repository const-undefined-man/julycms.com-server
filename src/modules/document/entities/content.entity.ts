import { CommonEntity } from '../../common-entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { Document } from './document.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
export class Content extends CommonEntity {
  @ApiPropertyOptional({ description: '内容' })
  @Column({ type: 'text', nullable: true })
  content: string;

  @ApiPropertyOptional({ description: '文档', type: Document })
  @OneToOne(() => Document, (document) => document.content)
  document: Document;
}
