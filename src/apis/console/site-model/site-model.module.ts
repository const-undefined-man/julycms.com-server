import { Module } from '@nestjs/common';
import { SiteModelModule as ComSiteModelModule } from '@app/modules';
import { SiteModelController } from './site-model.controller';

@Module({
  imports: [ComSiteModelModule],
  controllers: [SiteModelController],
})
export class SiteModelModule {}
