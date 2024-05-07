import { Module } from '@nestjs/common';
import { ManagerModule as ComManagerModule } from '@app/modules';
import { ManagerController } from './manager.controller';
import { AttachementModule } from '@app/modules/attachement/attachement.module';

@Module({
  imports: [ComManagerModule, AttachementModule],
  controllers: [ManagerController],
})
export class ManagerModule {}
