import { Module } from '@nestjs/common';
import { AttachementController } from './attachement.controller';
import { AttachementModule as ComAttachementModule } from '@app/modules';

@Module({
  imports: [ComAttachementModule],
  controllers: [AttachementController],
})
export class AttachementModule {}
