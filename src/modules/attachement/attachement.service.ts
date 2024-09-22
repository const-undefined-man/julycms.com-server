import { Injectable } from '@nestjs/common';
import { CreateAttachementDto } from './dto/create-attachement.dto';
import { UpdateAttachementDto } from './dto/update-attachement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, Repository } from 'typeorm';
import { Attachement } from './entities/attachement.entity';
import { BusinessException } from '@app/common';
import * as fs from 'fs';
import * as path from 'path';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Manager } from '../manager/entities/manager.entity';
import { QueryAttachementDto } from './dto/query-attachement.dto';

@Injectable()
export class AttachementService {
  constructor(
    @InjectRepository(Attachement)
    private readonly attachement: Repository<Attachement>,
  ) {}

  async save(createAttachementDto: CreateAttachementDto[], managerId: number) {
    const datas = [];
    for await (const item of createAttachementDto) {
      const attachement = new Attachement();
      ['id', 'url', 'size', 'mimetype', 'operatorType'].forEach((v) => {
        if (item[v]) {
          attachement[v] = item[v];
        }
      });

      // 如果ID存在，说明是修改；先删除之前的附件，再保存新的附件
      if (attachement.id) {
        const atta = await this.findOne(attachement.id);
        const filePath = path.join(__dirname, atta.url);
        fs.unlinkSync(filePath);
        this.attachement.remove(atta);
      }

      const manager = new Manager();
      manager.id = managerId;
      attachement.operator = manager;

      datas.push(attachement);
    }

    return this.attachement.save(datas);
  }

  async findAll(query: QueryAttachementDto) {
    const ipagination: IPaginationOptions = {
      page: query.page,
      limit: query.limit,
    };
    const where: FindOptionsWhere<Attachement> = {};
    if (query.id) {
      where.id = query.id;
    }
    if (query.size) {
      where.size = Between(query.size[0], query.size[1]);
    }
    if (query.operatorId) {
      where.operatorId = query.operatorId;
    }
    if (query.createdAt) {
      where.createdAt = Between(query.createdAt[0], query.createdAt[1]);
    }

    return paginate(this.attachement, ipagination, {
      relations: ['operator'],
      where,
    });
  }

  findOne(id: number) {
    return this.attachement.findOneBy({ id });
  }

  async update(id: number, updateAttachementDto: UpdateAttachementDto) {
    const data = new Attachement();

    ['userId', 'size', 'type', 'url', 'module', 'category'].forEach((v) => {
      if (updateAttachementDto[v]) {
        data[v] = updateAttachementDto[v];
      }
    });

    const res = await this.attachement.update(id, data);
    if (!res.affected) {
      throw new BusinessException({ code: 0, message: 'common.dataNotFound' });
    }
    return res;
  }

  async remove(id: number) {
    const attachement = await this.findOne(id);
    if (!attachement) {
      throw new BusinessException({ code: 0, message: 'common.dataNotFound' });
    }

    // 删除的时候要先检测状态是否正在使用
    // if (attachement.status === 1) {
    // 	throw new BusinessException({ code: 0, message: '该附件正在使用，不能删除' });
    // }

    // 删除硬盘附件
    if (attachement.url) {
      const filePath = path.join(__dirname, attachement.url);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    return this.attachement.remove(attachement);
  }

  async removeFile(id: number) {
    const attachement = await this.findOne(id);
    // 删除硬盘附件
    if (attachement.url) {
      const filePath = path.join(__dirname, attachement.url);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
  }

  count() {
    return this.attachement.count();
  }
}
