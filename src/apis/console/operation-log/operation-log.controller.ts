import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  SetMetadata,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { OperationLogService } from '@app/modules/operation-log/operation-log.service';
import { CreateOperationLogDto } from '@app/modules/operation-log/dto/create-operation-log.dto';
import { VerifyPermission, ReflectMetadataKeys } from '@app/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { queryParams } from '@app/modules/operation-log/type';
import { BatchRemoveDto } from '@app/modules/operation-log/dto/batch-remove.dto';
import { OperationLog } from '@app/modules/operation-log/entities/operation-log.entity';

@ApiTags('操作日志')
@ApiBearerAuth()
@Controller('api/console/operation-log')
@SetMetadata(ReflectMetadataKeys.CONTROLLER_NAME, '操作日志')
export class OperationLogController {
  constructor(private readonly operationLogService: OperationLogService) {}

  @ApiOperation({ summary: '创建' })
  @Post()
  create(@Body() createOperationLogDto: CreateOperationLogDto) {
    return this.operationLogService.create(createOperationLogDto);
  }

  @ApiOperation({ summary: '列表' })
  @ApiResponse({ status: 200, description: '200', type: [OperationLog] })
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
  @ApiQuery({
    name: 'username',
    required: false,
    description: '操作人',
    type: String,
  })
  @ApiQuery({
    name: 'createdAt',
    required: false,
    description: '创建时间',
    type: Array,
  })
  @Get()
  @VerifyPermission('system:operation-log:query')
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query() params: queryParams,
  ) {
    return this.operationLogService.findAll({ page, limit }, params);
  }

  @ApiOperation({ summary: '清除' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '清除')
  @Delete('clear')
  @VerifyPermission('system:operation-log:clear')
  clear() {
    return this.operationLogService.clear();
  }

  @ApiOperation({ summary: '删除' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '删除')
  @Delete(':id')
  @VerifyPermission('system:operation-log:delete')
  remove(@Param('id') id: string) {
    return this.operationLogService.remove(+id);
  }

  @ApiOperation({ summary: '批量删除' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '批量删除')
  @ApiBody({ required: true, description: 'ids', type: BatchRemoveDto })
  @Patch('batchDel')
  @VerifyPermission('system:operation-log:batchDel')
  batchRemove(@Body('ids') ids: number[]) {
    return this.operationLogService.batchRemove(ids);
  }
}
