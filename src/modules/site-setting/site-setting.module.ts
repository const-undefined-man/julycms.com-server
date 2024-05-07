import { Module } from '@nestjs/common';
import { SiteSettingService } from './site-setting.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteSetting } from './entities/site-setting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SiteSetting])],
  providers: [SiteSettingService],
  exports: [SiteSettingService],
})
export class SiteSettingModule {}
