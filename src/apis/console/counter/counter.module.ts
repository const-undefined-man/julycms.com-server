import { Module } from '@nestjs/common';
import { CounterModule as ComCounterModule } from '@app/modules';
import { CounterController } from './counter.controller';

@Module({
  imports: [ComCounterModule],
  controllers: [CounterController],
})
export class CounterModule {}
