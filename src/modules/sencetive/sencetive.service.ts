import { Injectable } from '@nestjs/common';
import { CreateSencetiveDto } from './dto/create-sencetive.dto';
import { UpdateSencetiveDto } from './dto/update-sencetive.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sencetive } from './entities/sencetive.entity';
import { In, Repository } from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import Mint from 'mint-filter';

@Injectable()
export class SencetiveService {
  constructor(
    @InjectRepository(Sencetive)
    private readonly sencetive: Repository<Sencetive>,
  ) {}

  create(createSencetiveDto: CreateSencetiveDto[]) {
    const data = [];
    createSencetiveDto.forEach((v) => {
      const item = new Sencetive();

      ['word', 'replaceWord', 'classify'].forEach((sv) => {
        item[sv] = v[sv];
      });

      data.push(item);
    });
    return this.sencetive.save(data);
  }

  findAll(options: IPaginationOptions) {
    return paginate(this.sencetive, options);
  }

  findOne(id: number) {
    return this.sencetive.findOneBy({ id });
  }

  update(updateSencetiveDto: UpdateSencetiveDto[]) {
    const data = [];
    updateSencetiveDto.forEach((v) => {
      const item = new Sencetive();

      ['id', 'word', 'replaceWord', 'classify'].forEach((sv) => {
        item[sv] = v[sv];
      });

      data.push(item);
    });
    return this.sencetive.save(data);
  }

  remove(id: number) {
    return this.sencetive.delete(id);
  }

  removeBat(ids: number[]) {
    return this.sencetive.delete({
      id: In(ids),
    });
  }

  /**
   * 检测目标文本中是否有敏感词
   * @param content string 待检测的文本
   * @returns Boolean
   */
  async verify(content: string): Promise<boolean> {
    const res = await this.sencetive.find();
    const words = res.map((v) => v.word);
    const mint = new Mint(words);
    return mint.verify(content);
  }

  /**
   * 检测目标文本中的敏感词
   * @param content string 待检测的文本
   * @returns FilterData
   * ```
   * { words: ["无法通过"], text: "这是一句无法通过的文本" }
   * ```
   */
  async filter(content: string) {
    const res = await this.sencetive.find();
    const words = res.map((v) => v.word);
    const mint = new Mint(words);
    const status = mint.filter(content, { replace: true });
    return {
      ...status,
    };
  }
}
