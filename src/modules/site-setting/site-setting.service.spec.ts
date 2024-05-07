import { Test, TestingModule } from '@nestjs/testing';
import { SiteSettingService } from './site-setting.service';

describe('SiteSettingService', () => {
  let service: SiteSettingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SiteSettingService],
    }).compile();

    service = module.get<SiteSettingService>(SiteSettingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
