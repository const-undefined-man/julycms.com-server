import { Injectable } from '@nestjs/common';
import { CreateSiteModelDto } from './dto/create-site-model.dto';
import { UpdateSiteModelDto } from './dto/update-site-model.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteModel } from './entities/site-model.entity';
import { BusinessException } from '@app/common';

@Injectable()
export class SiteModelService {
  constructor(
    @InjectRepository(SiteModel)
    private readonly siteModel: Repository<SiteModel>,
  ) {}

  create(createSiteModelDto: CreateSiteModelDto) {
    return this.siteModel.save(createSiteModelDto);
  }

  findAll(where) {
    return this.siteModel.find({ where });
  }

  findOne(id: number) {
    return this.siteModel.findOneBy({ id });
  }

  update(updateSiteModelDto: UpdateSiteModelDto) {
    return this.siteModel.save(updateSiteModelDto);
  }

  async remove(id: number) {
    const res = await this.findOne(id);
    if (!res) {
      throw new BusinessException({ code: 0, message: '数据不存在' });
    }

    return this.siteModel.remove(res);
  }

  display(id: number, display: number) {
    return this.siteModel.update(id, { display });
  }
}
