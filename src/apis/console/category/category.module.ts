import { Module } from '@nestjs/common';
import {
  CategoryModule as ComCategoryModule,
  SiteModelModule,
} from '@app/modules';
import { CategoryController } from './category.controller';

@Module({
  imports: [ComCategoryModule, SiteModelModule],
  controllers: [CategoryController],
})
export class CategoryModule {}
