import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { BusinessException } from '@app/common';

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private readonly tag: Repository<Tag>) {}

  create(createTagDto: CreateTagDto) {
    const data = new Tag();
    [
      'name',
      'pinyin',
      'letter',
      'seoTitle',
      'seoKeywords',
      'seoDescription',
    ].forEach((v) => {
      data[v] = createTagDto[v];
    });
    return this.tag.save(data);
  }

  findAll(options: IPaginationOptions) {
    return paginate(this.tag, options);
  }

  findOne(id: number) {
    return this.tag.findOne({ where: { id }, relations: ['documents'] });
  }

  update(updateTagDto: UpdateTagDto) {
    const data = new Tag();
    [
      'id',
      'name',
      'pinyin',
      'letter',
      'seoTitle',
      'seoKeywords',
      'seoDescription',
    ].forEach((v) => {
      data[v] = updateTagDto[v];
    });
    return this.tag.save(data);
  }

  async remove(id: number) {
    const res = await this.tag.delete(id);
    if (!res.affected) {
      throw new BusinessException({ code: 0, message: '数据不存在' });
    }
    return res;
  }

  display(id: number, display: number) {
    return this.tag.update(id, { display });
  }

  // 获取标签下面的数据量
  getCount(id: number) {
    const queryBuilder = this.tag.createQueryBuilder('tag');
    return queryBuilder
      .leftJoinAndSelect('tag.documents', 'document')
      .select('tag.id as tagId, COUNT(document.id) as contentCount')
      .where('tagId = :id', { id })
      .getRawOne();
  }

  // 更新统计字段
  async updateCount(id: number) {
    const countInfo = await this.getCount(id);
    // console.log('countInfo', countInfo);
    const data = new Tag();
    data.id = id;
    data.count = countInfo.contentCount;

    return this.tag.save(data);
  }

  count() {
    return this.tag.count();
  }
}
