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
import { DictService } from '@app/modules/dict/dict.service';
import { CreateDictDto } from '@app/modules/dict/dto/create-dict.dto';
import { UpdateDictDto } from '@app/modules/dict/dto/update-dict.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VerifyPermission, ReflectMetadataKeys } from '@app/common';
import { Dict } from '@app/modules/dict/entities/dict.entity';

@ApiTags('枚举管理')
@ApiBearerAuth()
@Controller('api/console/dict')
@SetMetadata(ReflectMetadataKeys.CONTROLLER_NAME, '枚举管理')
export class DictController {
  constructor(private readonly dictService: DictService) {}

  @ApiOperation({ summary: '添加' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '添加')
  @Post()
  @VerifyPermission('system:dict:create')
  create(@Body() createDictDto: CreateDictDto) {
    return this.dictService.create(createDictDto);
  }

  @ApiOperation({ summary: '列表' })
  @ApiResponse({ status: 200, description: '200', type: [Dict] })
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
  @VerifyPermission('system:dict:query')
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    return this.dictService.findAll({ page, limit });
  }

  @ApiOperation({ summary: '详细' })
  @ApiResponse({ status: 200, description: '200', type: Dict })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '详细')
  @Get(':id')
  @VerifyPermission('system:dict:detail')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.dictService.findOne(+id);
  }

  @ApiOperation({ summary: '详细-根据type查询详细' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '详细-根据type查询详细')
  @Get('values/:type')
  @VerifyPermission('system:dict:detail')
  findOneByType(@Param('type') type: string) {
    return this.dictService.findOneByType(type);
  }

  @ApiOperation({ summary: '修改' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '修改')
  @Patch()
  @VerifyPermission('system:dict:update')
  update(@Body() updateDictDto: UpdateDictDto) {
    return this.dictService.update(updateDictDto);
  }

  @ApiOperation({ summary: '删除' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '删除')
  @Delete(':id')
  @VerifyPermission('system:dict:delete')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.dictService.remove(+id);
  }

  @ApiOperation({ summary: '显示隐藏' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '显示隐藏')
  @Patch('display/:id/:display')
  @VerifyPermission('system:dict:display')
  display(
    @Param('id', ParseIntPipe) id: number,
    @Param('display', ParseIntPipe) display: number,
  ) {
    return this.dictService.display(id, display);
  }
}
