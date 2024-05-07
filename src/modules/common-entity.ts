import * as dayjs from 'dayjs';
import {
  AfterLoad,
  CreateDateColumn,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Index('id', ['id'], { unique: true })
export abstract class CommonEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @CreateDateColumn({ type: 'timestamp', nullable: true, comment: '创建时间' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp', nullable: true, comment: '更新时间' })
  updatedAt: string;

  @AfterLoad()
  formatTimes() {
    this.createdAt = dayjs(this.createdAt.toString()).format(
      'YYYY-MM-DD HH:mm:ss',
    );
    this.updatedAt = dayjs(this.createdAt.toString()).format(
      'YYYY-MM-DD HH:mm:ss',
    );
  }
}
