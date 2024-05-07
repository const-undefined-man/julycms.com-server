import { Category } from '@app/modules/category/entities/category.entity';
import { SiteSetting } from '@app/modules/site-setting/entities/site-setting.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class HomeVo {
  @ApiPropertyOptional({ description: '网站设置' })
  seo: SiteSetting;

  @ApiPropertyOptional({ description: '导航栏目', type: [Category] })
  category: Category[];
}
