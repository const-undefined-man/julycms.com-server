import { Injectable } from '@nestjs/common';
import { CreateDictValueDto } from './dto/create-dict-value.dto';
import { UpdateDictValueDto } from './dto/update-dict-value.dto';
import { DictValue } from './entities/dict-value.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DictService } from '../dict/dict.service';
import { BusinessException } from '@app/common';
import { Dict } from '../dict/entities/dict.entity';

@Injectable()
export class DictValueService {
  constructor(
    @InjectRepository(DictValue)
    private readonly dictValue: Repository<DictValue>,
    private readonly dictService: DictService,
  ) {}

  async create(createDictValueDto: CreateDictValueDto) {
    const hasData = await this.dictService.findOne(createDictValueDto.dict);
    if (!hasData) {
      throw new BusinessException({ code: 0, message: '字典不存在' });
    }

    const dict = new Dict();
    dict.id = createDictValueDto.dict;

    const data = new DictValue();
    ['label', 'value', 'style', 'display', 'listorder'].forEach((v) => {
      if (createDictValueDto[v]) {
        data[v] = createDictValueDto[v];
      }
    });

    data.dict = dict;

    return this.dictValue.save(data);
  }

  findAll(id: number) {
    return this.dictValue.find({ where: { dict: { id } } });
  }

  findOne(id: number) {
    return this.dictValue.findOne({ where: { id }, relations: ['dict'] });
  }

  async update(updateDictValueDto: UpdateDictValueDto) {
    const hasData = await this.dictService.findOne(updateDictValueDto.dict);

    if (!hasData) {
      throw new BusinessException({ code: 0, message: '字典不存在' });
    }

    const dict = new Dict();
    dict.id = updateDictValueDto.dict;

    const data = new DictValue();
    ['id', 'label', 'value', 'style', 'display', 'listorder'].forEach((v) => {
      if (updateDictValueDto[v]) {
        data[v] = updateDictValueDto[v];
      }
    });

    data.dict = dict;

    return this.dictValue.save(data);
  }

  async remove(id: number) {
    const res = await this.dictValue.delete(id);
    if (!res.affected) {
      throw new BusinessException({ code: 0, message: '数据不存在' });
    }
    return res;
  }

  display(id: number, display: number) {
    return this.dictValue.update(id, { display });
  }

  listorder(id: number, listorder: number) {
    return this.dictValue.update(id, { listorder });
  }
}
