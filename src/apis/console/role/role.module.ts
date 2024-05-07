import { Module } from '@nestjs/common';
import { RoleModule as ComRoleModule } from '@app/modules';
import { RoleController } from './role.controller';

@Module({
  imports: [ComRoleModule],
  controllers: [RoleController],
})
export class RoleModule {}
