import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
  Req,
  SetMetadata,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BusinessException } from '@app/common';
import { CategoryService } from '@app/modules/category/category.service';
import { SiteModelService } from '@app/modules/site-model/site-model.service';
import { VerifyPermission, ReflectMetadataKeys } from '@app/common';
import { CreateCategoryDto } from '@app/modules/category/dto/create-category.dto';
import { UpdateCategoryDto } from '@app/modules/category/dto/update-category.dto';
import { MoveCategoryDto } from '@app/modules/category/dto/move-category.dto';
import { Category } from '@app/modules/category/entities/category.entity';

@ApiTags('栏目管理')
@ApiBearerAuth()
@Controller('api/console/category')
@SetMetadata(ReflectMetadataKeys.CONTROLLER_NAME, '栏目管理')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly siteModelService: SiteModelService,
  ) {}

  @ApiOperation({ summary: '添加' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '添加')
  @Post()
  @VerifyPermission('content:category:create')
  async create(@Body() createCategoryDto: CreateCategoryDto, @Req() req) {
    const { catname, catnameEn, siteModel } = createCategoryDto;

    // 检查栏目标题重复
    const hasCatname = await this.categoryService.findOneBy({ catname });
    if (hasCatname) {
      throw new BusinessException({
        code: 0,
        message: `【${catname}】栏目标题已存在，请修改后重试`,
      });
    }

    // 检查英文栏目标题重复
    const hasCatnameEn = await this.categoryService.findOneBy({ catnameEn });
    if (hasCatnameEn) {
      throw new BusinessException({
        code: 0,
        message: `【${catnameEn}】英文栏目标题重复，请修改后重试`,
      });
    }

    // 检查模型是否存在
    const hasModel = await this.siteModelService.findOne(siteModel.id);
    if (!hasModel) {
      throw new BusinessException({
        code: 0,
        message: `模型【${siteModel.id}】不存在，请修改后重试`,
      });
    }

    return this.categoryService.create(createCategoryDto, req.user.userId);
  }

  @ApiOperation({ summary: '列表' })
  @ApiResponse({ status: 200, description: 'ok', type: [Category] })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '列表')
  @Get()
  @VerifyPermission('content:category:query')
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiOperation({ summary: '详细' })
  @ApiResponse({ status: 200, description: 'ok', type: Category })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '详细')
  @Get(':id')
  @VerifyPermission('content:category:detail')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findOne(+id);
  }

  @ApiOperation({ summary: '修改' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '修改')
  @Patch()
  @VerifyPermission('content:category:update')
  update(@Body() updateCategoryDto: UpdateCategoryDto, @Req() req) {
    return this.categoryService.update(updateCategoryDto, req.user.userId);
  }

  @ApiOperation({ summary: '删除' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '删除')
  @Delete(':id')
  @VerifyPermission('content:category:delete')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.remove(+id);
  }

  @ApiOperation({ summary: '显示隐藏' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '显示隐藏')
  @Patch('display/:id/:display')
  @VerifyPermission('content:category:display')
  display(
    @Param('id', ParseIntPipe) id: number,
    @Param('display', ParseIntPipe) display: number,
  ) {
    return this.categoryService.display(id, display);
  }

  @ApiOperation({ summary: '排序' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '排序')
  @Patch('listorder/:id/:listorder')
  @VerifyPermission('content:category:listorder')
  listorder(
    @Param('id', ParseIntPipe) id: number,
    @Param('listorder', ParseIntPipe) listorder: number,
  ) {
    return this.categoryService.listorder(id, listorder);
  }

  @ApiOperation({ summary: '重新统计数据' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '重新统计数据')
  @Post('recount')
  @VerifyPermission('content:category:recount')
  recount() {
    return this.categoryService.updateCount();
  }

  @ApiOperation({ summary: '批量移动导航栏目' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '批量移动导航栏目')
  @Post('move')
  @VerifyPermission('content:category:move')
  move(@Body() moveCategoryDto: MoveCategoryDto) {
    return this.categoryService.move(moveCategoryDto);
  }
}
