import { Module } from '@nestjs/common';
import { DictValueService } from './dict-value.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictValue } from './entities/dict-value.entity';
import { DictModule } from '../dict/dict.module';

@Module({
  imports: [TypeOrmModule.forFeature([DictValue]), DictModule],
  providers: [DictValueService],
  exports: [DictValueService],
})
export class DictValueModule {}
