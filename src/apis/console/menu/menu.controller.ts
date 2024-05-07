import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  SetMetadata,
  Req,
} from '@nestjs/common';
import { MenuService } from '@app/modules/menu/menu.service';
import { CreateMenuDto } from '@app/modules/menu/dto/create-menu.dto';
import { UpdateMenuDto } from '@app/modules/menu/dto/update-menu.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VerifyPermission, ReflectMetadataKeys } from '@app/common';
import { Menu } from '@app/modules/menu/entities/menu.entity';

@ApiTags('后台菜单管理')
@ApiBearerAuth()
@Controller('api/console/menu')
@SetMetadata(ReflectMetadataKeys.CONTROLLER_NAME, '后台菜单管理')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiOperation({ summary: '创建' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '创建')
  @Post()
  @VerifyPermission('system:menu:create')
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @ApiOperation({ summary: '权限树列表' })
  @Get('routers')
  findPermissionAll(@Req() req) {
    return this.menuService.findPermissionMenuTree(req.user.roles);
  }

  @ApiOperation({ summary: '树列表' })
  @ApiResponse({ status: 200, description: '200', type: [Menu] })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '树列表')
  @Get()
  @VerifyPermission('system:menu:query')
  findAll() {
    return this.menuService.findMenuTree();
  }

  @ApiOperation({ summary: '详细' })
  @ApiResponse({ status: 200, description: '200', type: Menu })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '详细')
  @Get(':id')
  @VerifyPermission('system:menu:detail')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.findOne(+id);
  }

  @ApiOperation({ summary: '修改' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '修改')
  @Patch()
  @VerifyPermission('system:menu:update')
  update(@Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(updateMenuDto);
  }

  @ApiOperation({ summary: '删除' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '删除')
  @Delete(':id')
  @VerifyPermission('system:menu:delete')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.remove(+id);
  }

  @ApiOperation({ summary: '显示隐藏' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '显示隐藏')
  @Patch('display/:id/:display')
  @VerifyPermission('system:menu:display')
  display(
    @Param('id', ParseIntPipe) id: number,
    @Param('display', ParseIntPipe) display: number,
  ) {
    return this.menuService.display(id, display);
  }

  @ApiOperation({ summary: '排序' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '排序')
  @Patch('listorder/:id/:listorder')
  @VerifyPermission('system:menu:listorder')
  listorder(
    @Param('id', ParseIntPipe) id: number,
    @Param('listorder', ParseIntPipe) listorder: number,
  ) {
    return this.menuService.listorder(id, listorder);
  }

  @ApiOperation({ summary: '是否快捷菜单' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '快捷菜单')
  @Patch('quickmenu/:id/:quickmenu')
  @VerifyPermission('system:menu:quickmenu')
  quickmenu(
    @Param('id', ParseIntPipe) id: number,
    @Param('quickmenu', ParseIntPipe) quickmenu: number,
  ) {
    return this.menuService.quickmenu(id, quickmenu);
  }
}
