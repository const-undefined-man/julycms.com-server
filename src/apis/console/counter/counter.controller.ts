import { Controller, Post, Body } from '@nestjs/common';
import { CounterService } from '@app/modules/counter/counter.service';
import { CreateCounterDto } from '@app/modules/counter/dto/create-counter.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('统计')
@ApiBearerAuth()
@Controller('api/console/count')
export class CounterController {
  constructor(private readonly countService: CounterService) {}

  @ApiOperation({ summary: '创建' })
  @Post()
  create(@Body() createCountDto: CreateCounterDto) {
    return this.countService.create(createCountDto);
  }
}
