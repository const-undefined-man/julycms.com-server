import { Module } from '@nestjs/common';
import { MenuModule as ComMenuModule } from '@app/modules';
import { MenuController } from './menu.controller';

@Module({
  imports: [ComMenuModule],
  controllers: [MenuController],
})
export class MenuModule {}
