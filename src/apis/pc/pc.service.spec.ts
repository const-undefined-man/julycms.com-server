import { Test, TestingModule } from '@nestjs/testing';
import { PcService } from './pc.service';

describe('PcService', () => {
  let service: PcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PcService],
    }).compile();

    service = module.get<PcService>(PcService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
