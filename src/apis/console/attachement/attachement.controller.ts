import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  ParseIntPipe,
  Query,
  DefaultValuePipe,
  SetMetadata,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { storage } from '@app/modules/attachement/attachement.storage';
import { AttachementService } from '@app/modules/attachement/attachement.service';
import { queryParams } from '@app/modules/attachement/type';
import { ReflectMetadataKeys, VerifyPermission } from '@app/common';
import { Attachement } from '@app/modules/attachement/entities/attachement.entity';

@ApiTags('附件')
@ApiBearerAuth()
@Controller('api/console/attachement')
@SetMetadata(ReflectMetadataKeys.CONTROLLER_NAME, '附件')
export class AttachementController {
  constructor(
    private readonly attachementService: AttachementService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({ summary: '上传' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '上传')
  @Post('upload')
  @UseInterceptors(FilesInterceptor('file', 5, { storage }))
  upload(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 8 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    files: Array<Express.Multer.File>,
  ) {
    // console.log(files);
    // console.log(process.cwd());
    const list = files.map((v) => {
      return v.path.replace(__dirname, '');
    });

    return list.length === 1 ? list[0] : list;
  }

  @ApiOperation({ summary: '列表' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '列表')
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
  @ApiQuery({ name: 'id', required: false, description: 'ID', type: Number })
  @ApiQuery({ name: 'size', required: false, description: '大小', type: Array })
  @ApiQuery({
    name: 'managerId',
    required: false,
    description: '操作人',
    type: Number,
  })
  @ApiQuery({
    name: 'createdAt',
    required: false,
    description: '创建时间',
    type: Array,
  })
  @ApiResponse({
    status: 200,
    description: '200',
    type: [Attachement],
  })
  @Get()
  @VerifyPermission('content:attachement:query')
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query() params: queryParams,
  ) {
    return this.attachementService.findAll({ page, limit }, params);
  }

  //
  // @ApiOperation({ summary: '获取详细' })
  // @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '获取详细')
  // @Get(':id')
  // @VerifyPermission('content:attachement:detail')
  // findOne(@Param('id', ParseIntPipe) id: number) {
  // 	return this.attachementService.findOne(+id);
  // }

  //
  // @ApiOperation({ summary: '修改' })
  // @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '修改')
  // @Patch(':id')
  // @VerifyPermission('content:attachement:update')
  // update(@Param('id', ParseIntPipe) id: number, @Body() updateAttachementDto: UpdateAttachementDto) {
  // 	return this.attachementService.update(+id, updateAttachementDto);
  // }

  @ApiOperation({ summary: '删除' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '删除')
  @Delete(':id')
  @VerifyPermission('content:attachement:delete')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.attachementService.remove(+id);
  }
}
