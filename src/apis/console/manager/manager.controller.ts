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
  Req,
  SetMetadata,
} from '@nestjs/common';
import { ManagerService } from '@app/modules/manager/manager.service';
import { CreateManagerDto } from '@app/modules/manager/dto/create-manager.dto';
import { UpdateManagerDto } from '@app/modules/manager/dto/update-manager.dto';
import { UpdatePasswordManagerDto } from '@app/modules/manager/dto/update-password-manager.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VerifyPermission, ReflectMetadataKeys } from '@app/common';
import { Manager } from '@app/modules/manager/entities/manager.entity';

@ApiTags('管理员管理')
@ApiBearerAuth()
@Controller('api/console/manager')
@SetMetadata(ReflectMetadataKeys.CONTROLLER_NAME, '管理员管理')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @ApiOperation({ summary: '创建' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '创建')
  @Post()
  @VerifyPermission('system:manager:create')
  create(@Body() createManagerDto: CreateManagerDto, @Req() req) {
    return this.managerService.create(createManagerDto, req.user.userId);
  }

  @ApiOperation({ summary: '列表' })
  @ApiResponse({ status: 200, description: '200', type: [Manager] })
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
  @VerifyPermission('system:manager:query')
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    return this.managerService.findAll({ page, limit });
  }

  @ApiOperation({ summary: '详细' })
  @ApiResponse({ status: 200, description: '200', type: Manager })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '详细')
  @Get(':id')
  @VerifyPermission('system:manager:detail')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const res = await this.managerService.findOne(+id);
    delete res.password;
    return res;
  }

  @ApiOperation({ summary: '修改密码' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '修改密码')
  @Patch('password')
  @VerifyPermission('system:manager:password')
  async updatePassword(@Body() updateManagerDto: UpdatePasswordManagerDto) {
    return this.managerService.updatePassword(updateManagerDto);
  }

  @ApiOperation({ summary: '修改' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '修改')
  @Patch()
  @VerifyPermission('system:manager:update')
  update(@Body() updateManagerDto: UpdateManagerDto, @Req() req) {
    return this.managerService.update(updateManagerDto, req.user.userId);
  }

  @ApiOperation({ summary: '删除' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '删除')
  @Delete(':id')
  @VerifyPermission('system:manager:delete')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.managerService.remove(+id);
  }

  @ApiOperation({ summary: '重置密码' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '重置密码')
  @Patch('resetPass/:id')
  @VerifyPermission('system:manager:reset-pass')
  resetPass(@Param('id', ParseIntPipe) id: number) {
    return this.managerService.resetPass(+id);
  }
}
