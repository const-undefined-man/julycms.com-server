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
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VerifyPermission, ReflectMetadataKeys } from '@app/common';
import { SiteSettingService } from '@app/modules/site-setting/site-setting.service';
import { CreateSiteSettingDto } from '@app/modules/site-setting/dto/create-site-setting.dto';
import { UpdateSiteSettingDto } from '@app/modules/site-setting/dto/update-site-setting.dto';
import { SiteSetting } from '@app/modules/site-setting/entities/site-setting.entity';

@ApiTags('站点设置')
@ApiBearerAuth()
@Controller('api/console/site-setting')
@SetMetadata(ReflectMetadataKeys.CONTROLLER_NAME, '站点设置')
export class SiteSettingController {
  constructor(private readonly siteSettingService: SiteSettingService) {}

  @ApiOperation({ summary: '添加' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '添加')
  @Post()
  create(@Body() createSiteSettingDto: CreateSiteSettingDto) {
    return this.siteSettingService.create(createSiteSettingDto);
  }

  @ApiOperation({ summary: '列表' })
  @ApiResponse({ status: 200, description: '200', type: [SiteSetting] })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '列表')
  @Get()
  findAll() {
    return this.siteSettingService.findAll();
  }

  @ApiOperation({ summary: '列表：根据type获取配置' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '列表：根据type获取配置')
  @Get('byType/:type')
  @VerifyPermission('site:setting:queryByType')
  findType(@Param('type', ParseIntPipe) type: number) {
    return this.siteSettingService.findType(type);
  }

  @ApiOperation({ summary: '修改' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '修改')
  @Patch()
  @VerifyPermission('site:setting:update')
  update(@Body('fields') updateSiteSettingDto: UpdateSiteSettingDto[]) {
    return this.siteSettingService.update(updateSiteSettingDto);
  }

  @ApiOperation({ summary: '删除' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '删除')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.siteSettingService.remove(+id);
  }
}
