import { Test, TestingModule } from '@nestjs/testing';
import { DictService } from './dict.service';

describe('DictService', () => {
  let service: DictService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DictService],
    }).compile();

    service = module.get<DictService>(DictService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
