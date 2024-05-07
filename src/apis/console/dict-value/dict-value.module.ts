import { Module } from '@nestjs/common';
import { DictValueModule as ComDictValueModule } from '@app/modules';
import { DictValueController } from './dict-value.controller';

@Module({
  imports: [ComDictValueModule],
  controllers: [DictValueController],
})
export class DictValueModule {}
