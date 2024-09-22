import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  Req,
  SetMetadata,
} from '@nestjs/common';
import { DocumentService } from '@app/modules/document/document.service';
import { CreateDocumentDto } from '@app/modules/document/dto/create-document.dto';
import { UpdateDocumentDto } from '@app/modules/document/dto/update-document.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  VerifyPermission,
  ReflectMetadataKeys,
  BusinessException,
} from '@app/common';
import { Document } from '@app/modules/document/entities/document.entity';
import { CategoryService } from '@app/modules/category/category.service';
import { QueryDocumentDto } from '@app/modules/document/dto/query-document.dto';
import { ParamDocumentDto } from '@app/modules/document/dto/param-document.dto';

@ApiTags('内容管理')
@ApiBearerAuth()
@Controller('api/console/document')
@SetMetadata(ReflectMetadataKeys.CONTROLLER_NAME, '内容管理')
export class DocumentController {
  constructor(
    private readonly documentService: DocumentService,
    private readonly categoryService: CategoryService,
  ) {}

  @ApiOperation({ summary: '添加' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '添加')
  @Post()
  @VerifyPermission('content:document:create')
  create(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentService.create(createDocumentDto);
  }

  @ApiOperation({ summary: '列表' })
  @ApiResponse({ status: 200, description: '200', type: [Document] })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '列表')
  @Get(':catId/:modelMark')
  @VerifyPermission('content:document:query')
  async findAll(
    @Param() { catId, modelMark }: ParamDocumentDto,
    @Query() query: QueryDocumentDto,
  ) {
    // 这里是根据栏目id获取栏目数据
    const cateinfo = await this.categoryService.findById(catId);
    if (!cateinfo) {
      throw new BusinessException({ code: 404, message: 'category.absend' });
    }
    // 单页模型
    if (modelMark === 'page') {
      const page = await this.documentService.findOnePage(catId);
      if (page) {
        return page;
      }

      return this.documentService.findAllPage(catId);
    } else {
      const ids = cateinfo.children.length
        ? cateinfo.children.map((item) => item.id)
        : [cateinfo.id];
      return this.documentService.findAllList(
        ids,
        { page: query.page || 1, limit: query.limit || 10 },
        { id: query.id, title: query.title },
      );
    }
  }

  @ApiOperation({ summary: '详细' })
  @ApiResponse({ status: 200, description: '200', type: Document })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '详细')
  @Get(':id')
  @VerifyPermission('content:document:detail')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.documentService.findOne(id);
  }

  @ApiOperation({ summary: '修改' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '修改')
  @Patch()
  @VerifyPermission('content:document:update')
  update(@Body() updateDocumentDto: UpdateDocumentDto) {
    return this.documentService.update(updateDocumentDto);
  }

  @ApiOperation({ summary: '删除' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '删除')
  @Delete(':id')
  @VerifyPermission('content:document:delete')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.documentService.remove(+id);
  }

  @ApiOperation({ summary: '显示隐藏' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '显示隐藏')
  @Patch('display/:id/:display')
  @VerifyPermission('content:document:display')
  display(
    @Param('id', ParseIntPipe) id: number,
    @Param('display', ParseIntPipe) display: number,
  ) {
    return this.documentService.display(id, display);
  }
}
