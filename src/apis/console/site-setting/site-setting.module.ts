import { Module } from '@nestjs/common';
import { SiteSettingModule as ComSiteSettingModule } from '@app/modules';
import { SiteSettingController } from './site-setting.controller';

@Module({
  imports: [ComSiteSettingModule],
  controllers: [SiteSettingController],
})
export class SiteSettingModule {}
