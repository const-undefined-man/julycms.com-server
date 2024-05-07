import { Test, TestingModule } from '@nestjs/testing';
import { AttachementService } from './attachement.service';

describe('AttachementService', () => {
  let service: AttachementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttachementService],
    }).compile();

    service = module.get<AttachementService>(AttachementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
