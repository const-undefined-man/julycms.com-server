import { Test, TestingModule } from '@nestjs/testing';
import { PatchService } from './patch.service';

describe('PatchService', () => {
  let service: PatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatchService],
    }).compile();

    service = module.get<PatchService>(PatchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
