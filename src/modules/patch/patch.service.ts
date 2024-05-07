import { Injectable } from '@nestjs/common';
import { CreatePatchDto } from './dto/create-patch.dto';
import { UpdatePatchDto } from './dto/update-patch.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patch } from './entities/patch.entity';
import { In, Like, Repository } from 'typeorm';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { BusinessException } from '@app/common';
import { queryParams } from './type';
import { PatchText } from './entities/patch-text.entity';
import { PatchList } from './entities/patch-list.entity';
import { Attachement } from '../attachement/entities/attachement.entity';
import { UpdatePatchTextDto } from './dto/update-patch-text.dto';
import { CreatePatchListDto } from './dto/create-patch-list.dto';
import { UpdatePatchListDto } from './dto/update-patch-list.dto';
import { AttachementService } from '../attachement/attachement.service';
import { BatchDisplayDto } from './dto/batch-display.dto';
import { Manager } from '../manager/entities/manager.entity';
import { existsSync, unlinkSync } from 'fs';
import * as path from 'path';
import { isNotEmptyObject } from 'class-validator';

@Injectable()
export class PatchService {
  constructor(
    @InjectRepository(Patch) private readonly patch: Repository<Patch>,

    @InjectRepository(PatchText)
    private readonly patchText: Repository<PatchText>,

    @InjectRepository(PatchList)
    private readonly patchList: Repository<PatchList>,

    private readonly attachementService: AttachementService,
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

  async findAll(options: IPaginationOptions, wheres: queryParams) {
    const where: queryParams = {};
    if (wheres.id) {
      where.id = wheres.id;
    }
    if (wheres.title) {
      where.title = Like(`%${wheres.title}%`);
    }
    if (wheres.type) {
      where.type = wheres.type;
    }
    const [items, total] = await this.patch
      .createQueryBuilder('patch')
      .leftJoinAndSelect('patch.manager', 'manager')
      .where(where)
      .skip((Number(options.page) - 1) * Number(options.limit))
      .take(Number(options.limit))
      .getManyAndCount();

    return {
      items,
      meta: {
        totalItems: total,
        currentPage: options.page,
        perPage: options.limit,
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
      throw new BusinessException({ code: 0, message: '数据不存在' });
    }

    // 列表类型碎片检测
    if (res.patchList && res.patchList.length) {
      throw new BusinessException({
        code: 0,
        message: '该碎片下有数据，请先删除碎片字数据再尝试',
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
      throw new BusinessException({ code: 0, message: '删除失败' });
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
      relations: ['img'],
    });
  }

  createPatchList(createPatchListDto: CreatePatchListDto, managerId: number) {
    const patchList = new PatchList();
    ['title', 'description', 'url'].forEach(
      (v) => (patchList[v] = createPatchListDto[v]),
    );

    if (isNotEmptyObject(createPatchListDto.img)) {
      const { url, size, mimetype } = createPatchListDto.img;
      if (url) {
        const attachement = new Attachement();
        attachement.url = url;
        attachement.size = size;
        attachement.mimetype = mimetype;
        attachement.operatorType = 1;

        const manager = new Manager();
        manager.id = managerId;
        attachement.operator = manager;

        patchList.img = attachement;
      }
    }

    const patch = new Patch();
    patch.id = createPatchListDto.patchId;
    patchList.patch = patch;

    return this.patchList.save(patchList);
  }

  async updatePatchList(
    updatePatchListDto: UpdatePatchListDto,
    managerId: number,
  ) {
    const patchList = new PatchList();
    ['id', 'title', 'description', 'url'].forEach(
      (v) => (patchList[v] = updatePatchListDto[v]),
    );

    if (isNotEmptyObject(updatePatchListDto.img)) {
      const attachement = new Attachement();
      const { id, url, size, mimetype } = updatePatchListDto.img;

      if (id) {
        attachement.id = id;
        // 如果ID存在，说明是修改；先删除之前的附件，再保存新的附件
        await this.attachementService.removeFile(id);
      }
      if (url) {
        attachement.url = url;
        attachement.size = size;
        attachement.mimetype = mimetype;
        attachement.operatorType = 1;

        const manager = new Manager();
        manager.id = managerId;
        attachement.operator = manager;

        patchList.img = attachement;
      }
    }

    return this.patchList.save(patchList);
  }

  async removePatchList(id: number) {
    const res = await this.patchList.findOne({
      where: { id },
      relations: ['img'],
    });
    if (!res) {
      throw new BusinessException({ code: 0, message: '数据不存在' });
    }

    try {
      return await this.patch.manager.transaction(async (manager) => {
        await manager.delete(PatchList, id);
        if (res.img) {
          const filePath = path.join(process.cwd(), res.img.url);
          if (existsSync(filePath)) {
            unlinkSync(filePath);
          }
          await manager.delete(Attachement, { id: res.img.id });
        }
      });
    } catch (error) {
      throw new BusinessException({ code: 0, message: '删除失败' });
    }
  }

  sortPatchList(patchListId: number, listorder: number) {
    return this.patchList.update(patchListId, { listorder });
  }
}
