import { CommonEntity } from '@app/modules/common-entity';
import { Manager } from '@app/modules/manager/entities/manager.entity';
import { PatchList } from '@app/modules/patch/entities/patch-list.entity';
import { PatchText } from '@app/modules/patch/entities/patch-text.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity({ orderBy: { id: 'DESC' } })
export class Patch extends CommonEntity {
  @ApiPropertyOptional({ description: '标题' })
  @Column({ type: 'varchar', unique: true, length: 32, comment: '标题' })
  title: string;

  @ApiPropertyOptional({ description: '描述' })
  @Column({ type: 'varchar', nullable: true, length: 255, comment: '描述' })
  description: string | null;

  @ApiPropertyOptional({ description: '是否启用;0禁用；1启用' })
  @Column({
    type: 'tinyint',
    comment: '是否启用;0禁用；1启用',
    width: 1,
    default: 1,
  })
  display: number | 1;

  @ApiPropertyOptional({ description: '类型;0: 富文本； 1:列表' })
  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
    comment: '类型;0: 富文本； 1:列表',
  })
  type: number | 0;

  @ApiPropertyOptional({ type: Manager, description: '管理员' })
  @OneToOne(() => Manager, (manager) => manager.patch, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  manager: Manager;

  @ApiPropertyOptional({ type: PatchText, description: '富文本' })
  @OneToOne(() => PatchText, (patchText) => patchText.patch, {
    createForeignKeyConstraints: false,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  patchText: PatchText;

  @ApiPropertyOptional({ type: [PatchList], description: '列表' })
  @OneToMany(() => PatchList, (patchList) => patchList.patch, {
    createForeignKeyConstraints: false,
    cascade: true,
  })
  patchList: PatchList[];
}
