import { Test, TestingModule } from '@nestjs/testing';
import { DictValueService } from './dict-value.service';

describe('DictValueService', () => {
  let service: DictValueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DictValueService],
    }).compile();

    service = module.get<DictValueService>(DictValueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
