import { Module } from '@nestjs/common';
import { PcService } from './pc.service';
import { PcController } from './pc.controller';

import {
  CategoryModule,
  DocumentModule,
  SiteSettingModule,
} from '@app/modules';

@Module({
  imports: [SiteSettingModule, CategoryModule, DocumentModule],
  controllers: [PcController],
  providers: [PcService],
  exports: [PcService],
})
export class PcModule {}
