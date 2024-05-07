import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttachementService } from './attachement.service';
import { Attachement } from './entities/attachement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attachement])],
  providers: [AttachementService],
  exports: [AttachementService],
})
export class AttachementModule {}
