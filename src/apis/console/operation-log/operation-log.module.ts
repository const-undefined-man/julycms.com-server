import { Module } from '@nestjs/common';
import { OperationLogModule as ComOperationLogModule } from '@app/modules';
import { OperationLogController } from './operation-log.controller';

@Module({
  imports: [ComOperationLogModule],
  controllers: [OperationLogController],
})
export class OperationLogModule {}
