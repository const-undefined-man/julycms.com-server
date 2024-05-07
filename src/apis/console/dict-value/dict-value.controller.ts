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
  SetMetadata,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DictValueService } from '@app/modules/dict-value/dict-value.service';
import { CreateDictValueDto } from '@app/modules/dict-value/dto/create-dict-value.dto';
import { UpdateDictValueDto } from '@app/modules/dict-value/dto/update-dict-value.dto';
import { VerifyPermission, ReflectMetadataKeys } from '@app/common';
import { DictValue } from '@app/modules/dict-value/entities/dict-value.entity';

@ApiTags('枚举值管理')
@ApiBearerAuth()
@Controller('api/console/dict-value')
@SetMetadata(ReflectMetadataKeys.CONTROLLER_NAME, '枚举值管理')
export class DictValueController {
  constructor(private readonly dictValueService: DictValueService) {}

  @VerifyPermission('system:dict-value:create')
  @ApiOperation({ summary: '添加' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '添加')
  @Post()
  create(@Body() createDictValueDto: CreateDictValueDto) {
    return this.dictValueService.create(createDictValueDto);
  }

  @VerifyPermission('system:dict-value:query')
  @ApiOperation({ summary: '列表' })
  @ApiResponse({ status: 200, description: '200', type: [DictValue] })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '列表')
  @Get()
  findAll(@Query('id', new DefaultValuePipe(10), ParseIntPipe) id: number) {
    return this.dictValueService.findAll(id);
  }

  @VerifyPermission('system:dict-value:detail')
  @ApiOperation({ summary: '详细' })
  @ApiResponse({ status: 200, description: '200', type: DictValue })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '详细')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.dictValueService.findOne(+id);
  }

  @VerifyPermission('system:dict-value:update')
  @ApiOperation({ summary: '修改' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '修改')
  @Patch()
  update(@Body() updateDictValueDto: UpdateDictValueDto) {
    return this.dictValueService.update(updateDictValueDto);
  }

  @VerifyPermission('system:dict-value:delete')
  @ApiOperation({ summary: '删除' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '删除')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.dictValueService.remove(+id);
  }

  @ApiOperation({ summary: '显示隐藏' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '显示隐藏')
  @Patch('display/:id/:display')
  @VerifyPermission('system:dict-value:display')
  display(
    @Param('id', ParseIntPipe) id: number,
    @Param('display', ParseIntPipe) display: number,
  ) {
    return this.dictValueService.display(id, display);
  }

  @ApiOperation({ summary: '排序' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '排序')
  @Patch('listorder/:id/:listorder')
  @VerifyPermission('system:dict-value:listorder')
  listorder(
    @Param('id', ParseIntPipe) id: number,
    @Param('listorder', ParseIntPipe) listorder: number,
  ) {
    return this.dictValueService.listorder(id, listorder);
  }
}
