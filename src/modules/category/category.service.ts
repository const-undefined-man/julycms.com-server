import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { BusinessException } from '@app/common';
import { SiteModel } from '../site-model/entities/site-model.entity';
import { AttachementService } from '../attachement/attachement.service';
import { Attachement } from '../attachement/entities/attachement.entity';
import { MoveCategoryDto } from './dto/move-category.dto';
import { Manager } from '../manager/entities/manager.entity';
import { isNotEmptyObject } from 'class-validator';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly category: TreeRepository<Category>,
    private readonly attachementService: AttachementService,
  ) {}

  create(createCategoryDto: CreateCategoryDto, managerId: number) {
    const { parent, siteModel, cover } = createCategoryDto;
    const data = new Category();
    [
      'catname',
      'catnameEn',
      'catdir',
      'description',
      'seoTitle',
      'seoKeywords',
      'seoDescription',
      'display',
    ].forEach((v) => {
      if (createCategoryDto[v]) {
        data[v] = createCategoryDto[v];
      }
    });

    // 外部链接模型
    if (siteModel.id === 4) {
      data.linkUrl = createCategoryDto.linkUrl;
    }

    // 关联附件-栏目封面
    if (isNotEmptyObject(cover)) {
      const { url, size, mimetype } = cover;

      if (url) {
        const attachement = new Attachement();
        attachement.url = url;
        attachement.size = size;
        attachement.mimetype = mimetype;
        attachement.operatorType = 1;

        const manager = new Manager();
        manager.id = managerId;
        attachement.operator = manager;

        data.cover = attachement;
      }
    }

    // parent
    if (parent.id) {
      const parentCate = new Category();
      parentCate.id = parent.id;
      data.parent = parentCate;
    }

    // siteModel
    const siteModelRel = new SiteModel();
    siteModelRel.id = siteModel.id;
    data.siteModel = siteModelRel;

    return this.category.save(data);
  }

  findAll() {
    return this.category.findTrees({ relations: ['siteModel'] });
  }

  findOne(id: number) {
    return this.category.findOne({
      where: { id },
      relations: ['cover', 'siteModel', 'parent'],
    });
  }

  findOneBy(where) {
    return this.category.findOneBy(where);
  }

  async update(updateCategoryDto: UpdateCategoryDto, managerId: number) {
    const { parent, siteModel, cover } = updateCategoryDto;
    const data = new Category();
    [
      'id',
      'catname',
      'catnameEn',
      'catdir',
      'description',
      'seoTitle',
      'seoKeywords',
      'seoDescription',
      'display',
    ].forEach((v) => {
      if (updateCategoryDto[v]) {
        data[v] = updateCategoryDto[v];
      }
    });

    // 外部链接模型
    if (siteModel.id === 4) {
      data.linkUrl = updateCategoryDto.linkUrl;
    }

    // 关联附件-栏目封面
    if (isNotEmptyObject(cover)) {
      const attachement = new Attachement();
      const { id, url, size, mimetype } = cover;

      if (id) {
        attachement.id = id;
        const oldCover = await this.attachementService.findOne(id);
        if (oldCover.url !== url) {
          await this.attachementService.removeFile(id);
        }
      }

      attachement.url = url;
      attachement.size = size;
      attachement.mimetype = mimetype;
      attachement.operatorType = 1;

      const manager = new Manager();
      manager.id = managerId;
      attachement.operator = manager;

      data.cover = attachement;
    }

    // parent
    if (parent.id) {
      const parentCate = new Category();
      parentCate.id = parent.id;
      data.parent = parentCate;
    } else {
      data.parent = null;
    }

    // siteModel
    const siteModelRel = new SiteModel();
    siteModelRel.id = siteModel.id;
    data.siteModel = siteModelRel;
    // console.log('category', data);
    return this.category.save(data);
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    if (!category) {
      throw new BusinessException({ code: 0, message: '数据不存在' });
    }

    const childrenCount = await this.category.countDescendants(category);
    if (childrenCount > 1) {
      throw new BusinessException({
        code: 0,
        message: '该栏目下有子栏目，请先删除子栏目',
      });
    }

    return this.category.remove(category);
  }

  display(id: number, display: number) {
    return this.category.update(id, { display });
  }

  listorder(id: number, listorder: number) {
    return this.category.update(id, { listorder });
  }

  // 获取栏目下面的数据量
  getCount() {
    const queryBuilder = this.category.createQueryBuilder('category');
    return queryBuilder
      .leftJoinAndSelect('category.documents', 'document')
      .groupBy('category.id')
      .select(
        'category.id as categoryId, category.catname as categoryName, COUNT(document.id) as contentCount',
      )
      .orderBy('categoryId')
      .getRawMany();
  }

  // 更新统计字段
  async updateCount() {
    const list = await this.getCount();
    const data = [];
    list.forEach((v) => {
      const item = new Category();
      item.id = v.categoryId;
      item.count = v.contentCount;

      data.push(item);
    });
    return this.category.save(data);
  }

  // 栏目移动
  move(moveCategoryDto: MoveCategoryDto) {
    const { from, to } = moveCategoryDto;

    // to
    const toCategory = new Category();
    toCategory.id = to;

    // from
    const data = [];
    from.forEach((v) => {
      const item = new Category();
      item.id = v;
      item.parent = to ? toCategory : null;

      data.push(item);
    });

    return this.category.save(data);
  }

  count() {
    return this.category.count();
  }

  findById(id: number) {
    return this.category.findOne({
      where: { id },
      relations: ['parent', 'documents', 'children', 'cover'],
    });
  }

  findByCatnameEn(catnameEn: string) {
    return this.category.findOne({
      where: { catnameEn },
      relations: ['parent', 'documents', 'children', 'cover'],
    });
  }
}
