import { Injectable } from '@nestjs/common';
import { CreateSiteSettingDto } from './dto/create-site-setting.dto';
import { UpdateSiteSettingDto } from './dto/update-site-setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SiteSetting } from './entities/site-setting.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SiteSettingService {
  constructor(
    @InjectRepository(SiteSetting)
    private readonly siteSetting: Repository<SiteSetting>,
  ) {}

  create(createSiteSettingDto: CreateSiteSettingDto) {
    return this.siteSetting.save(createSiteSettingDto);
  }

  findAll() {
    return this.siteSetting.find();
  }

  findOne(id: number) {
    return this.siteSetting.findOne({ where: { id } });
  }

  findType(type: number) {
    return this.siteSetting.find({ where: { type } });
  }

  async update(updateSiteSettingDto: UpdateSiteSettingDto[]) {
    return this.siteSetting.save(updateSiteSettingDto);
  }

  remove(id: number) {
    return this.siteSetting.delete(id);
  }
}
