import { CommonEntity } from '@app/modules/common-entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

@Entity('sencetive', { orderBy: { id: 'DESC' } })
export class Sencetive extends CommonEntity {
  @ApiPropertyOptional({ description: '敏感词' })
  @Column({
    type: 'varchar',
    nullable: true,
    unique: true,
    comment: '敏感词',
    length: 16,
  })
  word: string | null;

  @ApiPropertyOptional({ description: '替换词' })
  @Column({ type: 'varchar', nullable: true, comment: '替换词', length: 16 })
  replaceWord: string | '*';

  @ApiPropertyOptional({ description: '敏感词类别' })
  @Column('tinyint', {
    comment:
      '敏感词类别; 0 广告；1 政治；2 涉枪涉爆；3 网址；4 色情; 5极限用语 6违禁权威性词语 7虚假宣传祈福、涉嫌迷信 8化妆品虚假宣传功效',
    width: 1,
    default: 1,
  })
  classify: number | null;
}
