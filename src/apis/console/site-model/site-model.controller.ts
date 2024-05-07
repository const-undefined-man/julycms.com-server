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
import { SiteModelService } from '@app/modules/site-model/site-model.service';
import { CreateSiteModelDto } from '@app/modules/site-model/dto/create-site-model.dto';
import { UpdateSiteModelDto } from '@app/modules/site-model/dto/update-site-model.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VerifyPermission, ReflectMetadataKeys } from '@app/common';
import { SiteModel } from '@app/modules/site-model/entities/site-model.entity';

@ApiTags('模型管理')
@ApiBearerAuth()
@Controller('api/console/site-model')
@SetMetadata(ReflectMetadataKeys.CONTROLLER_NAME, '模型管理')
export class SiteModelController {
  constructor(private readonly siteModelService: SiteModelService) {}

  @ApiOperation({ summary: '添加' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '添加')
  @Post()
  @VerifyPermission('site:model:create')
  create(@Body() createSiteModelDto: CreateSiteModelDto) {
    return this.siteModelService.create(createSiteModelDto);
  }

  @ApiOperation({ summary: '列表' })
  @ApiResponse({ status: 200, description: '200', type: [SiteModel] })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '列表')
  @Get()
  @VerifyPermission('site:model:query')
  findAll() {
    return this.siteModelService.findAll({});
  }

  @ApiOperation({ summary: '详细' })
  @ApiResponse({ status: 200, description: '200', type: SiteModel })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '详细')
  @Get(':id')
  @VerifyPermission('site:model:detail')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.siteModelService.findOne(+id);
  }

  @ApiOperation({ summary: '修改' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '修改')
  @Patch()
  @VerifyPermission('site:model:update')
  update(@Body() updateSiteModelDto: UpdateSiteModelDto) {
    return this.siteModelService.update(updateSiteModelDto);
  }

  @ApiOperation({ summary: '删除' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '删除')
  @Delete(':id')
  @VerifyPermission('site:model:delete')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.siteModelService.remove(+id);
  }

  @ApiOperation({ summary: '显示隐藏' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '显示隐藏')
  @Patch('display/:id/:display')
  @VerifyPermission('site:model:display')
  display(
    @Param('id', ParseIntPipe) id: number,
    @Param('display', ParseIntPipe) display: number,
  ) {
    return this.siteModelService.display(id, display);
  }
}
