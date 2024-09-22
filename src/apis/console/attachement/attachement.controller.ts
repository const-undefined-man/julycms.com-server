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
  SetMetadata,
  Req,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { storage } from '@app/modules/attachement/attachement.storage';
import { AttachementService } from '@app/modules/attachement/attachement.service';
import { ReflectMetadataKeys, VerifyPermission } from '@app/common';
import { Attachement } from '@app/modules/attachement/entities/attachement.entity';
import { QueryAttachementDto } from '@app/modules/attachement/dto/query-attachement.dto';

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
  async upload(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 8 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    files: Array<Express.Multer.File>,
    @Req() req,
  ) {
    const attachements = [];
    files.forEach((v) => {
      const url = v.path.replace(__dirname, '');
      const attachement = new Attachement();
      attachement.url = url;
      attachement.size = v.size;
      attachement.mimetype = v.mimetype;
      attachement.operatorType = 1;

      attachements.push(attachement);
    });

    const res = await this.attachementService.save(
      attachements,
      req.user.userId,
    );

    const list = res.map((v) => {
      return { id: v.id, url: v.url };
    });

    return list.length === 1 ? list[0] : list;
  }

  @ApiOperation({ summary: '列表' })
  @SetMetadata(ReflectMetadataKeys.ACTION_NAME, '列表')
  @ApiResponse({
    status: 200,
    description: '200',
    type: [Attachement],
  })
  @Get()
  @VerifyPermission('content:attachement:query')
  findAll(@Query() query: QueryAttachementDto) {
    return this.attachementService.findAll(query);
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
