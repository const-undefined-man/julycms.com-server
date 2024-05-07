import { Module } from '@nestjs/common';
import { PatchService } from './patch.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patch } from './entities/patch.entity';
import { PatchText } from './entities/patch-text.entity';
import { PatchList } from './entities/patch-list.entity';
import { AttachementModule } from '../attachement/attachement.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patch, PatchText, PatchList]),
    AttachementModule,
  ],
  providers: [PatchService],
  exports: [PatchService],
})
export class PatchModule {}
