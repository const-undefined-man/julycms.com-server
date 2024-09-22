import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  SetMetadata,
  Patch,
} from '@nestjs/common';
import { LoginLogService } from '@app/modules/login-log/login-log.service';
import { CreateLoginLogDto } from '@app/modules/login-log/dto/create-login-log.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VerifyPermission, ReflectMetadataKeys } from '@app/common';
import { BatchRemoveDto } from '@app/modules/login-log/dto/batch-remove.dto';
import { LoginLog } from '@app/modules/login-log/entities/login-log.entity';
import { QueryLogDto } from '@app/modules/login-log/dto/query-log-dto';

@ApiTags('登录日志')
@ApiBearerAuth()
@Controller('api/console/login-log')
@SetMetadata(ReflectMetadataKeys.CONTROLLER_NAME, '登录日志')
export class LoginLogController {
  constructor(private readonly loginLogService: LoginLogService) {}

  @ApiOperation({ summary: '创建' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '创建')
  @Post()
  create(@Body() createLoginLogDto: CreateLoginLogDto) {
    return this.loginLogService.create(createLoginLogDto);
  }

  @ApiOperation({ summary: '列表' })
  @ApiResponse({ status: 200, description: '200', type: LoginLog })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '列表')
  @Get()
  @VerifyPermission('system:login-log:query')
  findAll(@Query() query: QueryLogDto) {
    return this.loginLogService.findAll(query);
  }

  @ApiOperation({ summary: '清除' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '清除')
  @Delete('clear')
  @VerifyPermission('system:login-log:clear')
  clear() {
    return this.loginLogService.clear();
  }

  @ApiOperation({ summary: '删除' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '删除')
  @Delete(':id')
  @VerifyPermission('system:login-log:delete')
  remove(@Param('id') id: string) {
    return this.loginLogService.remove(+id);
  }

  @ApiOperation({ summary: '批量删除' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '批量删除')
  @ApiBody({ required: true, description: 'ids', type: BatchRemoveDto })
  @Patch('batchDel')
  @VerifyPermission('system:login-log:batchDel')
  batchRemove(@Body('ids') ids: number[]) {
    return this.loginLogService.batchRemove(ids);
  }
}
