import { Module } from '@nestjs/common';
import { CounterService } from './counter.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Counter } from './entities/counter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Counter])],
  providers: [CounterService],
  exports: [CounterService],
})
export class CounterModule {}
