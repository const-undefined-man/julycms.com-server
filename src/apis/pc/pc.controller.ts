import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from '@app/modules/category/category.service';
import { DocumentService } from '@app/modules/document/document.service';
import { BusinessException } from '@app/common';
import { SiteSettingService } from '@app/modules/site-setting/site-setting.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HomeVo } from './vo/home.vo';
import { CategoryVo } from './vo/category.vo';
import { DetailVo } from './vo/detail.vo';

@ApiTags('PC 端')
@Controller('api/pc')
export class PcController {
  constructor(
    private readonly siteSettingService: SiteSettingService,
    private readonly categoryService: CategoryService,
    private readonly documentService: DocumentService,
  ) {}

  @ApiResponse({ status: 200, type: HomeVo })
  @Get('content')
  async index() {
    // seo
    const settings = await this.siteSettingService.findType(0);
    const seo = {};
    settings.forEach((v) => {
      seo[v.name] = v.value;
    });
    // 导航栏目
    const category = await this.categoryService.findAll();

    return { seo, category };
  }

  @ApiResponse({ status: 200, description: '200', type: CategoryVo })
  @Get('content/:catnameEn')
  async category(@Param('catnameEn') catnameEn: string) {
    const category = await this.categoryService.findAll();
    category.forEach((v) => {
      v['active'] = v.catdir === catnameEn;
    });
    const detail = await this.categoryService.findByCatnameEn(catnameEn);
    if (!detail) {
      throw new BusinessException({ code: 0, message: '栏目不存在' });
    }

    const seo = {
      seoTitle: detail.seoTitle,
      seoKeywords: detail.seoKeywords,
      seoDescription: detail.seoDescription,
    };
    return { seo, curCate: detail, category, detail };
  }

  @ApiResponse({ status: 200, description: '200', type: DetailVo })
  @Get('content/:catnameEn/:id')
  async detail(
    @Param('catnameEn') catnameEn: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const category = await this.categoryService.findAll();
    const detail = await this.categoryService.findByCatnameEn(catnameEn);
    if (!detail) {
      throw new BusinessException({ code: 0, message: '栏目不存在' });
    }
    const seo = {
      seoTitle: detail.seoTitle,
      seoKeywords: detail.seoKeywords,
      seoDescription: detail.seoDescription,
    };
    const document = await this.documentService.findOne(id);
    if (!document) {
      throw new BusinessException({ code: 0, message: '文档不存在' });
    }
    return { seo, curCate: detail, category, detail, document };
  }
}
