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
  DefaultValuePipe,
  SetMetadata,
} from '@nestjs/common';
import { TagService } from '@app/modules/tag/tag.service';
import { CreateTagDto } from '@app/modules/tag/dto/create-tag.dto';
import { UpdateTagDto } from '@app/modules/tag/dto/update-tag.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VerifyPermission, ReflectMetadataKeys } from '@app/common';
import { Tag } from '@app/modules/tag/entities/tag.entity';

@ApiTags('标签管理')
@ApiBearerAuth()
@Controller('api/console/tag')
@SetMetadata(ReflectMetadataKeys.CONTROLLER_NAME, '标签管理')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @ApiOperation({ summary: '添加' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '添加')
  @Post()
  @VerifyPermission('content:tag:create')
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @ApiOperation({ summary: '列表' })
  @ApiResponse({ status: 200, description: '200', type: [Tag] })
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
  @Get()
  @VerifyPermission('content:tag:query')
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    return this.tagService.findAll({ page, limit });
  }

  @ApiOperation({ summary: '详细' })
  @ApiResponse({ status: 200, description: '200', type: Tag })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '详细')
  @Get(':id')
  @VerifyPermission('content:tag:detail')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tagService.findOne(+id);
  }

  @ApiOperation({ summary: '修改' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '修改')
  @Patch()
  @VerifyPermission('content:tag:update')
  update(@Body() updateTagDto: UpdateTagDto) {
    return this.tagService.update(updateTagDto);
  }

  @ApiOperation({ summary: '删除' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '删除')
  @Delete(':id')
  @VerifyPermission('content:tag:delete')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tagService.remove(+id);
  }

  @ApiOperation({ summary: '显示隐藏' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '显示隐藏')
  @Patch('display/:id/:display')
  @VerifyPermission('content:tag:display')
  display(
    @Param('id', ParseIntPipe) id: number,
    @Param('display', ParseIntPipe) display: number,
  ) {
    return this.tagService.display(id, display);
  }

  @ApiOperation({ summary: '统计' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '统计')
  @VerifyPermission('content:tag:count')
  @Get('count/:id')
  count(@Param('id', ParseIntPipe) id: number) {
    return this.tagService.updateCount(id);
  }
}
