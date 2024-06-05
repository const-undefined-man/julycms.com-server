import { Module } from '@nestjs/common';
import { PcService } from './pc.service';
import { PcController } from './pc.controller';

import {
  CategoryModule,
  CounterModule,
  DocumentModule,
  PatchModule,
  SiteSettingModule,
} from '@app/modules';

@Module({
  imports: [
    SiteSettingModule,
    CategoryModule,
    DocumentModule,
    PatchModule,
    CounterModule,
  ],
  controllers: [PcController],
  providers: [PcService],
  exports: [PcService],
})
export class PcModule {}
