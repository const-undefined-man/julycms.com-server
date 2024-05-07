import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SencetiveService } from './sencetive.service';
import { Sencetive } from './entities/sencetive.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sencetive])],
  providers: [SencetiveService],
  exports: [SencetiveService],
})
export class SencetiveModule {}
