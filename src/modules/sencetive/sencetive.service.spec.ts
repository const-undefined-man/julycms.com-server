import { Test, TestingModule } from '@nestjs/testing';
import { SencetiveService } from './sencetive.service';

describe('SencetiveService', () => {
  let service: SencetiveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SencetiveService],
    }).compile();

    service = module.get<SencetiveService>(SencetiveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
