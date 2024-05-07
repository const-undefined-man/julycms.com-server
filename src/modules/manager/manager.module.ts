import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from './entities/manager.entity';
import { AttachementModule } from '../attachement/attachement.module';

@Module({
  imports: [TypeOrmModule.forFeature([Manager]), AttachementModule],
  providers: [ManagerService],
  exports: [ManagerService],
})
export class ManagerModule {}
