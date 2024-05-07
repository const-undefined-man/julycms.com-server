import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Req,
  SetMetadata,
} from '@nestjs/common';
import { PatchService } from '@app/modules/patch/patch.service';
import { CreatePatchDto } from '@app/modules/patch/dto/create-patch.dto';
import { UpdatePatchDto } from '@app/modules/patch/dto/update-patch.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { queryParams } from '@app/modules/patch/type';
import { UpdatePatchTextDto } from '@app/modules/patch/dto/update-patch-text.dto';
import { CreatePatchListDto } from '@app/modules/patch/dto/create-patch-list.dto';
import { UpdatePatchListDto } from '@app/modules/patch/dto/update-patch-list.dto';
import { BatchDisplayDto } from '@app/modules/patch/dto/batch-display.dto';
import { BatchRemoveDto } from '@app/modules/patch/dto/batch-remove.dto';
import { VerifyPermission, ReflectMetadataKeys } from '@app/common';
import { Patch as PatchDto } from '@app/modules/patch/entities/patch.entity';
import { PatchList } from '@app/modules/patch/entities/patch-list.entity';

@ApiTags('碎片管理')
@ApiBearerAuth()
@Controller('api/console/patch')
@SetMetadata(ReflectMetadataKeys.CONTROLLER_NAME, '碎片管理')
export class PatchController {
  constructor(private readonly patchService: PatchService) {}

  @ApiOperation({ summary: '添加' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '添加')
  @Post()
  @VerifyPermission('content:patch:create')
  create(@Body() createPatchDto: CreatePatchDto, @Req() req) {
    return this.patchService.create(createPatchDto, req.user.userId);
  }

  @ApiOperation({ summary: '列表' })
  @ApiResponse({ status: 200, description: '200', type: [PatchDto] })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '列表')
  @ApiQuery({
    name: 'page',
    required: true,
    description: '第几页',
    type: Number,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: true,
    description: '每页显示数',
    type: Number,
    example: 10,
  })
  @ApiQuery({ name: 'id', required: false, description: 'ID', type: Number })
  @ApiQuery({
    name: 'title',
    required: false,
    description: '标题',
    type: String,
  })
  @ApiQuery({
    name: 'type',
    required: false,
    description: '类型',
    type: Number,
  })
  @Get()
  @VerifyPermission('content:patch:query')
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query() params: queryParams,
  ) {
    return this.patchService.findAll({ page, limit }, params);
  }

  @ApiOperation({ summary: '修改' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '修改')
  @Patch()
  @VerifyPermission('content:patch:update')
  update(@Body() updatePatchDto: UpdatePatchDto, @Req() req) {
    return this.patchService.update(updatePatchDto, req.user.userId);
  }

  @ApiOperation({ summary: '删除' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '删除')
  @Delete(':id')
  @VerifyPermission('content:patch:delete')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.patchService.remove(+id);
  }

  @ApiOperation({ summary: '显示隐藏' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '显示隐藏')
  @Patch('display/:id/:display')
  @VerifyPermission('content:patch:display')
  display(
    @Param('id', ParseIntPipe) id: number,
    @Param('display', ParseIntPipe) display: number,
  ) {
    return this.patchService.display(id, display);
  }

  @ApiOperation({ summary: '批量显示隐藏' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '批量显示隐藏')
  @Patch('displayBat')
  @VerifyPermission('content:patch:batDisplay')
  displayBat(@Body() batchDisplayDto: BatchDisplayDto) {
    return this.patchService.batchDisplay(batchDisplayDto);
  }

  @ApiOperation({ summary: '批量删除' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '批量删除')
  @ApiBody({ required: true, description: 'ids', type: BatchRemoveDto })
  @Patch('displayDel')
  @VerifyPermission('content:patch:batDelete')
  displayRemove(@Body('ids') ids: number[]) {
    return this.patchService.batchRemove(ids);
  }

  @ApiOperation({ summary: '碎片 - 富文本 更新' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '碎片 - 富文本 更新')
  @Patch('text')
  @VerifyPermission('content:patch:textUpdate')
  updateText(@Body() updatePatchTextDto: UpdatePatchTextDto) {
    return this.patchService.updateText(updatePatchTextDto);
  }

  @ApiOperation({ summary: '碎片 - 列表' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '碎片 - 列表')
  @ApiResponse({ status: 200, description: '200', type: [PatchList] })
  @ApiQuery({ name: 'id', required: true, type: Number, description: '碎片id' })
  @Get('list')
  @VerifyPermission('content:patch:listQuery')
  queryPatchList(@Query('id', ParseIntPipe) id: number) {
    return this.patchService.queryPatchList(id);
  }

  @ApiOperation({ summary: '详细' })
  @ApiResponse({ status: 200, description: '200', type: PatchDto })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '详细')
  @Get(':id')
  @VerifyPermission('content:patch:detail')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.patchService.findOne(+id);
  }

  @ApiOperation({ summary: '碎片 - 列表 添加' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '碎片 - 列表 添加')
  @Post('list')
  @VerifyPermission('content:patch:listCreate')
  createPatchList(@Body() createPatchListDto: CreatePatchListDto, @Req() req) {
    return this.patchService.createPatchList(
      createPatchListDto,
      req.user.userId,
    );
  }

  @ApiOperation({ summary: '碎片 - 列表 修改' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '碎片 - 列表 修改')
  @Patch('list')
  @VerifyPermission('content:patch:listUpdate')
  updatePatchList(@Body() updatePatchListDto: UpdatePatchListDto, @Req() req) {
    return this.patchService.updatePatchList(
      updatePatchListDto,
      req.user.userId,
    );
  }

  @ApiOperation({ summary: '碎片 - 列表 删除' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '碎片 - 列表 删除')
  @Delete('list/:id')
  @VerifyPermission('content:patch:listDel')
  removePatchList(@Param('id', ParseIntPipe) id: number) {
    return this.patchService.removePatchList(+id);
  }

  @ApiOperation({ summary: '碎片 - 列表 排序' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '碎片 - 列表 排序')
  @Patch('list/:id/:listorder')
  @VerifyPermission('content:patch:listListorder')
  listorder(
    @Param('id', ParseIntPipe) id: number,
    @Param('listorder', ParseIntPipe) listorder: number,
  ) {
    return this.patchService.sortPatchList(id, listorder);
  }
}
