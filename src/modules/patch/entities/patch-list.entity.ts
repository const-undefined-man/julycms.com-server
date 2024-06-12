import { Attachement } from '@app/modules/attachement/entities/attachement.entity';
import { CommonEntity } from '../../common-entity';
import { Patch } from '@app/modules/patch/entities/patch.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class PatchList extends CommonEntity {
  @ApiPropertyOptional({ description: '标题' })
  @Column({ type: 'varchar', comment: '标题', length: 32 })
  title: string | null;

  @ApiPropertyOptional({ description: '描述' })
  @Column({ type: 'varchar', length: 255, nullable: true, comment: '描述' })
  description: string | null;

  @ApiPropertyOptional({ description: '图片', type: Attachement })
  @OneToOne(() => Attachement, (attachement) => attachement.patchList, {
    cascade: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  img: Attachement;

  @ApiPropertyOptional({ description: '链接地址' })
  @Column({ type: 'varchar', length: 255, nullable: true, comment: '链接地址' })
  url: string | null;

  @ApiPropertyOptional({ description: '排序' })
  @Column({ type: 'smallint', default: 99, nullable: true, comment: '排序' })
  listorder: number | null;

  @ApiPropertyOptional({ type: Patch })
  @ManyToOne(() => Patch, (patch) => patch.patchList)
  patch: Patch;
}
