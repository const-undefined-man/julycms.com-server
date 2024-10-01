import { Injectable } from '@nestjs/common';
import { CreatePatchDto } from './dto/create-patch.dto';
import { UpdatePatchDto } from './dto/update-patch.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patch } from './entities/patch.entity';
import { In, Like, Repository } from 'typeorm';
import { BusinessException } from '@app/common';
import { queryParams } from './type';
import { PatchText } from './entities/patch-text.entity';
import { PatchList } from './entities/patch-list.entity';
import { Attachement } from '../attachement/entities/attachement.entity';
import { UpdatePatchTextDto } from './dto/update-patch-text.dto';
import { CreatePatchListDto } from './dto/create-patch-list.dto';
import { UpdatePatchListDto } from './dto/update-patch-list.dto';
import { BatchDisplayDto } from './dto/batch-display.dto';
import { Manager } from '../manager/entities/manager.entity';
import { existsSync, unlinkSync } from 'fs';
import * as path from 'path';
import { QueryPatchDto } from './dto/query-patch.dto';

@Injectable()
export class PatchService {
  constructor(
    @InjectRepository(Patch) private readonly patch: Repository<Patch>,

    @InjectRepository(PatchText)
    private readonly patchText: Repository<PatchText>,

    @InjectRepository(PatchList)
    private readonly patchList: Repository<PatchList>,
  ) {}

  create(createPatchDto: CreatePatchDto, managerId: number) {
    const patch = new Patch();

    ['title', 'description', 'type'].forEach((v) => {
      patch[v] = createPatchDto[v];
    });

    const manager = new Manager();
    manager.id = managerId;
    patch.manager = manager;

    if (createPatchDto.type === 0) {
      const patchText = new PatchText();
      patchText.content = '';
      patch.patchText = patchText;
    }

    return this.patch.save(patch);
  }

  async findAll(query: QueryPatchDto) {
    const where: queryParams = {};
    if (query.id) {
      where.id = query.id;
    }
    if (query.title) {
      where.title = Like(`%${query.title}%`);
    }
    if (query.type) {
      where.type = query.type;
    }
    const [items, total] = await this.patch
      .createQueryBuilder('patch')
      .leftJoinAndSelect('patch.manager', 'manager')
      .where(where)
      .skip((Number(query.page || 1) - 1) * Number(query.limit || 10))
      .take(Number(query.limit || 10))
      .getManyAndCount();

    return {
      items,
      meta: {
        totalItems: total,
        currentPage: query.page || 1,
        perPage: query.limit || 10,
      },
    };
  }

  findOne(id: number) {
    return this.patch.findOne({
      where: { id },
      relations: ['patchText', 'patchList'],
    });
  }

  update(updatePatchDto: UpdatePatchDto, managerId: number) {
    const patch = new Patch();

    ['id', 'title', 'description', 'type'].forEach((v) => {
      patch[v] = updatePatchDto[v];
    });

    const manager = new Manager();
    manager.id = managerId;
    patch.manager = manager;

    return this.patch.save(patch);
  }

  async remove(id: number) {
    const res = await this.findOne(id);
    if (!res) {
      throw new BusinessException({ code: 0, message: 'common.dataNotFound' });
    }

    // 列表类型碎片检测
    if (res.patchList && res.patchList.length) {
      throw new BusinessException({
        code: 0,
        message: 'patch.hasData',
      });
    }

    try {
      return await this.patch.manager.transaction(async (manager) => {
        await manager.delete(Patch, id);
        if (res.patchText) {
          await manager.delete(PatchText, { id: res.patchText.id });
        }
      });
    } catch (error) {
      throw new BusinessException({ code: 0, message: 'patch.deleteFail' });
    }
  }

  display(id: number, display: number) {
    return this.patch.update(id, { display });
  }

  batchDisplay({ ids, display }: BatchDisplayDto) {
    return this.patch.update({ id: In(ids) }, { display });
  }

  async batchRemove(ids: number[]) {
    const patchs = await this.patch.findBy({ id: In(ids) });
    return this.patch.remove(patchs);
  }

  updateText(updatePatchTextDto: UpdatePatchTextDto) {
    const patchText = new PatchText();
    ['id', 'content'].forEach((v) => {
      patchText[v] = updatePatchTextDto[v];
    });

    return this.patchText.save(patchText);
  }

  queryPatchList(id: number) {
    return this.patchList.find({
      where: {
        patch: { id },
      },
      order: {
        listorder: 1,
      },
      relations: ['img'],
    });
  }

  createPatchList(createPatchListDto: CreatePatchListDto) {
    const patchList = new PatchList();
    ['title', 'description', 'url'].forEach(
      (v) => (patchList[v] = createPatchListDto[v]),
    );

    patchList.imgId = createPatchListDto.img?.id || null;

    const patch = new Patch();
    patch.id = createPatchListDto.patchId;
    patchList.patch = patch;

    return this.patchList.save(patchList);
  }

  async updatePatchList(updatePatchListDto: UpdatePatchListDto) {
    const patchList = new PatchList();
    ['id', 'title', 'description', 'url'].forEach(
      (v) => (patchList[v] = updatePatchListDto[v]),
    );

    patchList.imgId = updatePatchListDto.img?.id || null;

    return this.patchList.save(patchList);
  }

  async removePatchList(id: number) {
    const res = await this.patchList.findOne({
      where: { id },
      relations: ['img'],
    });
    if (!res) {
      throw new BusinessException({ code: 0, message: 'common.dataNotFound' });
    }

    try {
      return await this.patch.manager.transaction(async (manager) => {
        await manager.delete(PatchList, id);
        if (res.img) {
          const filePath = path.join(__dirname, res.img.url);
          if (existsSync(filePath)) {
            unlinkSync(filePath);
          }
          await manager.delete(Attachement, { id: res.img.id });
        }
      });
    } catch (error) {
      throw new BusinessException({ code: 0, message: 'patch.deleteFail' });
    }
  }

  sortPatchList(patchListId: number, listorder: number) {
    return this.patchList.update(patchListId, { listorder });
  }

  async getPatch(id: number) {
    const patch = await this.patch.findOne({
      where: { id },
      relations: ['patchText', 'patchList', 'patchList.img'],
    });
    if (!patch || !patch.display) {
      return {};
    }
    return patch;
  }
}
