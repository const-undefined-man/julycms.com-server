import {
  Controller,
  DefaultValuePipe,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CategoryService } from '@app/modules/category/category.service';
import { DocumentService } from '@app/modules/document/document.service';
import { BusinessException } from '@app/common';
import { SiteSettingService } from '@app/modules/site-setting/site-setting.service';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PatchService } from '@app/modules/patch/patch.service';
import { NavContentVo } from './vo/nav.content.vo';
import { CounterService } from '@app/modules/counter/counter.service';
import { SeoVO } from './vo/seo.vo';
import { Category } from '@app/modules/category/entities/category.entity';
import { Document } from '@app/modules/document/entities/document.entity';
import { Patch } from '@app/modules/patch/entities/patch.entity';

@ApiTags('PC 端')
@Controller('api/pc')
export class PcController {
  constructor(
    private readonly siteSettingService: SiteSettingService,
    private readonly categoryService: CategoryService,
    private readonly documentService: DocumentService,
    private readonly patchService: PatchService,
    private readonly counterService: CounterService,
  ) {}

  /**
   * 获取网站信息
   * @returns Object
   */
  @ApiResponse({ status: 200, type: SeoVO })
  @Get('site')
  async site() {
    const res = await this.siteSettingService.findType(0);
    const info: any = {};
    res.forEach((v) => {
      info[v.name] = v.value;
    });
    return {
      title: info.seoTitle,
      keywords: info.seoKeywords,
      description: info.seoDescription,
    };
  }

  /**
   * 获取取导航栏目
   * @returns Array
   */
  @ApiResponse({ status: 200, type: [Category] })
  @Get('nav')
  async nav() {
    const categoryAll = await this.categoryService.findAll();
    return this.categoryService.filterTreeByDisplay(categoryAll);
  }

  /**
   * 获取某个导航栏目以及子栏目
   * @param catdir string 栏目目录
   * @returns Object
   */
  @ApiResponse({ status: 200, type: Category })
  @Get('nav-children/:catdir')
  async navChildren(@Param('catdir') catdir: string) {
    const res = await this.categoryService.findOneByCatdir(catdir, [
      'cover',
      'children',
    ]);
    if (!res) {
      throw new BusinessException({ code: 404, message: '栏目不存在' });
    }
    return res;
  }

  /**
   * 获取某个导航栏目下面的内容
   * 单页类型，返回单页内容
   * 文章 图集 外链 模型，返回列表
   * @param catdir string 栏目目录
   * @returns Object || Array
   */
  @ApiResponse({ status: 200, type: NavContentVo })
  @ApiQuery({
    name: 'page',
    required: false,
    description: '第几页',
    type: Number,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: '每页显示数',
    type: Number,
    example: 10,
  })
  @Get('nav-content/:catdir')
  async navContent(
    @Param('catdir') catdir: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    const cateinfo = await this.categoryService.findOneByCatdir(catdir, [
      'siteModel',
      'children',
      'cover',
    ]);
    if (!cateinfo) {
      throw new BusinessException({ code: 404, message: '栏目不存在' });
    }
    const navContent: NavContentVo = {
      catname: cateinfo.catname,
      catnameEn: cateinfo.catnameEn,
      catdir: cateinfo.catdir,
      description: cateinfo.description,
      cover: cateinfo.cover,
      seo: {
        title: cateinfo.seoTitle,
        keywords: cateinfo.seoKeywords,
        description: cateinfo.seoDescription,
      },
      siteModel: cateinfo.siteModel.mark,
      children: cateinfo.children,
      document: {
        title: '',
        content: '',
      },
      documents: [],
      total: 0,
    };

    if (cateinfo.siteModel.mark === 'page') {
      const document = await this.documentService.findOnePage(cateinfo.id);
      navContent.document.title = document.title;
      navContent.document.content = document.content.content;
      this.documentService.increaseRead(document.id, +document.readNum + 1);
      this.counterService.create({ type: 'document', documentId: document.id });
    } else {
      const ids = cateinfo.children.length
        ? cateinfo.children.map((item) => item.id)
        : [cateinfo.id];

      const list = await this.documentService.findAllList(
        ids,
        { page, limit },
        { display: 1 },
      );

      navContent.documents = list.items;
      navContent.total = list.meta.totalItems;
    }

    return navContent;
  }

  @ApiResponse({ status: 200, description: '200', type: Patch })
  @Get('patch/:id')
  async patch(@Param('id', ParseIntPipe) id: number) {
    const res = await this.patchService.getPatch(id);
    if (!res) {
      throw new BusinessException({ code: 404, message: '碎片不存在' });
    }
    return res;
  }

  @ApiResponse({ status: 200, description: '200', type: Document })
  @Get('article/:id')
  async article(@Param('id', ParseIntPipe) id: number) {
    const document = await this.documentService.findOne(id);
    if (!document) {
      throw new NotFoundException('文章不存在');
    }
    this.documentService.increaseRead(document.id, +document.readNum + 1);
    this.counterService.create({ type: 'document', documentId: id });
    return document;
  }
}
