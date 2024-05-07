import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuService } from './menu.service';
import { Menu } from './entities/menu.entity';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [TypeOrmModule.forFeature([Menu]), RoleModule],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
