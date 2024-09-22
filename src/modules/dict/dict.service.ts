import { Injectable } from '@nestjs/common';
import { CreateDictDto } from './dto/create-dict.dto';
import { UpdateDictDto } from './dto/update-dict.dto';
import { Dict } from './entities/dict.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { BusinessException } from '@app/common';
import { QueryDto } from '../query-dto';

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

  findAll({ page, limit }: QueryDto) {
    const options: IPaginationOptions = { page, limit };
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
      throw new BusinessException({ code: 0, message: 'dict.isDisabled' });
    }

    return dict.values.filter((v) => v.display == 1);
  }

  update(updateEnumDto: UpdateDictDto) {
    return this.dict.save(updateEnumDto);
  }

  async remove(id: number) {
    const dict = await this.findOne(id);
    if (!dict) {
      throw new BusinessException({ code: 0, message: 'common.dataNotFound' });
    }

    if (dict.values.length) {
      throw new BusinessException({
        code: 0,
        message: 'dict.hasData',
      });
    }

    return this.dict.remove(dict);
  }

  display(id: number, display: number) {
    return this.dict.update(id, { display });
  }
}
