import { Test, TestingModule } from '@nestjs/testing';
import { SiteModelService } from './site-model.service';

describe('SiteModelService', () => {
  let service: SiteModelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SiteModelService],
    }).compile();

    service = module.get<SiteModelService>(SiteModelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
