import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { AttachementModule } from '../attachement/attachement.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), AttachementModule],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
