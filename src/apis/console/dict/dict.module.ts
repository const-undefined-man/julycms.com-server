import { Module } from '@nestjs/common';
import { DictModule as ComDictModule } from '@app/modules';
import { DictController } from './dict.controller';

@Module({
  imports: [ComDictModule],
  controllers: [DictController],
})
export class DictModule {}
