import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  DefaultValuePipe,
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
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VerifyPermission, ReflectMetadataKeys } from '@app/common';
import { Document } from '@app/modules/document/entities/document.entity';

@ApiTags('内容管理')
@ApiBearerAuth()
@Controller('api/console/document')
@SetMetadata(ReflectMetadataKeys.CONTROLLER_NAME, '内容管理')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @ApiOperation({ summary: '添加' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '添加')
  @Post()
  @VerifyPermission('content:document:create')
  create(@Body() createDocumentDto: CreateDocumentDto, @Req() req) {
    return this.documentService.create(createDocumentDto, req.user.userId);
  }

  @ApiOperation({ summary: '列表' })
  @ApiResponse({ status: 200, description: '200', type: [Document] })
  @ApiQuery({
    name: 'id',
    required: false,
    description: '第几页',
    type: Number,
    example: 1,
  })
  @ApiQuery({
    name: 'title',
    required: false,
    description: '每页显示数',
    type: String,
    example: '标题',
  })
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
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '列表')
  @Get(':catId/:modelMark')
  @VerifyPermission('content:document:query')
  async findAll(
    @Param('catId', ParseIntPipe) catId: number,
    @Param('modelMark') modelMark: string,
    @Query('id', new DefaultValuePipe(0), ParseIntPipe) id: number,
    @Query('title') title: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    // 文章模型，直接返回该模型关联的栏目文章列表
    if (modelMark === 'article') {
      return this.documentService.findAllList(
        catId,
        { page, limit },
        { id, title },
      );
    }
    // 图集模型，返回该模型关联的栏目图集列表
    else if (modelMark === 'album') {
      return this.documentService.findAllList(
        catId,
        { page, limit },
        { id, title },
      );
    }
    // 单页模型
    else if (modelMark === 'page') {
      const page = await this.documentService.findOnePage(catId);
      if (page) {
        return page;
      }

      return this.documentService.findAllPage(catId);
    }
    // 链接模型
    else if (modelMark === 'link') {
      return this.documentService.findAllList(
        catId,
        { page, limit },
        { id, title },
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
  update(@Body() updateDocumentDto: UpdateDocumentDto, @Req() req) {
    return this.documentService.update(updateDocumentDto, req.user.userId);
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
