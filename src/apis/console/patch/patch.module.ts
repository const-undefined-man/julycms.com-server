import { Module } from '@nestjs/common';
import { PatchModule as ComPatchModule } from '@app/modules';
import { PatchController } from './patch.controller';
import { AttachementModule } from '@app/modules/attachement/attachement.module';

@Module({
  imports: [ComPatchModule, AttachementModule],
  controllers: [PatchController],
})
export class PatchModule {}
