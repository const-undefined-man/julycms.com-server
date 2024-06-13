import { CommonEntity } from '@app/modules/common-entity';
import { Patch } from '@app/modules/patch/entities/patch.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity()
export class PatchText extends CommonEntity {
  @ApiPropertyOptional({ description: '内容' })
  @Column({ type: 'text', nullable: true, comment: '内容' })
  content: string | null;

  @ApiPropertyOptional({ description: 'Patch' })
  @OneToOne(() => Patch, (patch) => patch.patchText)
  patch: Patch;
}
