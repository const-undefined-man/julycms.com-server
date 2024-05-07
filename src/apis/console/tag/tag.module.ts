import { Module } from '@nestjs/common';
import { TagModule as ComTagModule } from '@app/modules';
import { TagController } from './tag.controller';

@Module({
  imports: [ComTagModule],
  controllers: [TagController],
})
export class TagModule {}
