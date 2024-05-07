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
import { RoleService } from '@app/modules/role/role.service';
import { CreateRoleDto } from '@app/modules/role/dto/create-role.dto';
import { UpdateRoleDto } from '@app/modules/role/dto/update-role.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VerifyPermission, ReflectMetadataKeys } from '@app/common';
import { Role } from '@app/modules/role/entities/role.entity';

@ApiTags('角色管理')
@ApiBearerAuth()
@Controller('api/console/role')
@SetMetadata(ReflectMetadataKeys.CONTROLLER_NAME, '角色管理')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: '添加' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '添加')
  @Post()
  @VerifyPermission('system:role:create')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @ApiOperation({ summary: '列表' })
  @ApiResponse({ status: 200, description: '200', type: [Role] })
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
  @VerifyPermission('system:role:query')
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    return this.roleService.findAll({ page, limit });
  }

  @ApiOperation({ summary: '详细' })
  @ApiResponse({ status: 200, description: '200', type: Role })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '详细')
  @Get(':id')
  @VerifyPermission('system:role:detail')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.findOne(+id);
  }

  @ApiOperation({ summary: '修改' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '修改')
  @Patch()
  @VerifyPermission('system:role:update')
  update(@Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(updateRoleDto);
  }

  @ApiOperation({ summary: '删除' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '删除')
  @Delete(':id')
  @VerifyPermission('system:role:delete')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.remove(+id);
  }

  @ApiOperation({ summary: '禁用/启用' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '禁用/启用')
  @Patch('status/:id/:status')
  @VerifyPermission('system:role:status')
  status(
    @Param('id', ParseIntPipe) id: number,
    @Param('status', ParseIntPipe) status: number,
  ) {
    return this.roleService.status(id, status);
  }
}
