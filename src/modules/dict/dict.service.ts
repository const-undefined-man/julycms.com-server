import { Injectable } from '@nestjs/common';
import { CreateDictDto } from './dto/create-dict.dto';
import { UpdateDictDto } from './dto/update-dict.dto';
import { Dict } from './entities/dict.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { BusinessException } from '@app/common';

@Injectable()
export class DictService {
  constructor(
    @InjectRepository(Dict) private readonly dict: Repository<Dict>,
  ) {}

  create(createEnumDto: CreateDictDto) {
    // const data = {};
    // ['name', 'type', 'display', 'remark'].forEach((v) => {
    // 	if (createEnumDto[v]) {
    // 		data[v] = createEnumDto[v];
    // 	}
    // });
    return this.dict.save(createEnumDto);
  }

  findAll(options: IPaginationOptions) {
    return paginate(this.dict, options);
  }

  findOne(id: number) {
    return this.dict.findOne({ where: { id }, relations: ['values'] });
  }

  async findOneByType(type: string) {
    const dict = await this.dict.findOne({
      where: { type },
      relations: ['values'],
    });
    if (!dict.display) {
      throw new BusinessException({ code: 0, message: '字典数据已禁用' });
    }

    return dict.values.filter((v) => v.display == 1);
  }

  update(updateEnumDto: UpdateDictDto) {
    return this.dict.save(updateEnumDto);
  }

  async remove(id: number) {
    const dict = await this.findOne(id);
    if (!dict) {
      throw new BusinessException({ code: 0, message: '数据不存在' });
    }

    if (dict.values.length) {
      throw new BusinessException({
        code: 0,
        message: '该数据有绑定字段数据，不能删除',
      });
    }

    return this.dict.remove(dict);
  }

  display(id: number, display: number) {
    return this.dict.update(id, { display });
  }
}
