import { Module } from '@nestjs/common';
import { DictService } from './dict.service';
import { Dict } from './entities/dict.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Dict])],
  providers: [DictService],
  exports: [DictService],
})
export class DictModule {}
