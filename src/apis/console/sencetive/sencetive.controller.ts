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
  Put,
  ParseArrayPipe,
  SetMetadata,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VerifyPermission, ReflectMetadataKeys } from '@app/common';
import { SencetiveService } from '@app/modules/sencetive/sencetive.service';
import { CreateSencetiveDto } from '@app/modules/sencetive/dto/create-sencetive.dto';
import { UpdateSencetiveDto } from '@app/modules/sencetive/dto/update-sencetive.dto';
import { Sencetive } from '@app/modules/sencetive/entities/sencetive.entity';

@ApiTags('敏感词')
@ApiBearerAuth()
@Controller('api/console/sencetive')
@SetMetadata(ReflectMetadataKeys.CONTROLLER_NAME, '敏感词')
export class SencetiveController {
  constructor(private readonly sencetiveService: SencetiveService) {}

  @ApiOperation({ summary: '添加' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '添加')
  @Post()
  @VerifyPermission('site:sencetive:create')
  create(@Body() createSencetiveDto: CreateSencetiveDto[]) {
    return this.sencetiveService.create(createSencetiveDto);
  }

  @ApiOperation({ summary: '列表' })
  @ApiResponse({ status: 200, description: '200', type: [Sencetive] })
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
  @VerifyPermission('site:sencetive:query')
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    return this.sencetiveService.findAll({ page, limit });
  }

  @ApiOperation({ summary: '详细' })
  @ApiResponse({ status: 200, description: '200', type: Sencetive })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '详细')
  @Get(':id')
  @VerifyPermission('site:sencetive:detail')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sencetiveService.findOne(+id);
  }

  @ApiOperation({ summary: '修改' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '修改')
  @Patch()
  @VerifyPermission('site:sencetive:update')
  update(@Body() updateSencetiveDto: UpdateSencetiveDto[]) {
    return this.sencetiveService.update(updateSencetiveDto);
  }

  @ApiOperation({ summary: '删除' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '删除')
  @Delete(':id')
  @VerifyPermission('site:sencetive:delete')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sencetiveService.remove(+id);
  }

  @ApiOperation({ summary: '批量删除' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '批量删除')
  @Put('delete')
  @VerifyPermission('site:sencetive:batDel')
  removeBat(@Body('ids', ParseArrayPipe) ids: number[]) {
    return this.sencetiveService.removeBat(ids);
  }
}
