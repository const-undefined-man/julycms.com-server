import { Category } from '@app/modules/category/entities/category.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { HomeVo } from './home.vo';

export class CategoryVo extends HomeVo {
  @ApiPropertyOptional({ description: '当前分类' })
  curCate: Category;

  @ApiPropertyOptional({ description: '当前分类下文章列表' })
  detail: [];
}
