import { Module } from '@nestjs/common';
import { SencetiveModule as ComSencetiveModule } from '@app/modules';
import { SencetiveController } from './sencetive.controller';

@Module({
  imports: [ComSencetiveModule],
  controllers: [SencetiveController],
})
export class SencetiveModule {}
