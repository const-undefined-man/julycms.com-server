import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteModelService } from './site-model.service';
import { SiteModel } from './entities/site-model.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SiteModel])],
  providers: [SiteModelService],
  exports: [SiteModelService],
})
export class SiteModelModule {}
