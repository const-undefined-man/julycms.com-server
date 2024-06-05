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
    const { parent, siteModel, cover, imgIcon } = createCategoryDto;
    const data = new Category();
    [
      'catname',
      'catnameEn',
      'catdir',
      'description',
      'icon',
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

    // 关联附件-栏目图片icon
    if (isNotEmptyObject(imgIcon)) {
      const { url, size, mimetype } = imgIcon;

      if (url) {
        const attachement = new Attachement();
        attachement.url = url;
        attachement.size = size;
        attachement.mimetype = mimetype;
        attachement.operatorType = 1;

        const manager = new Manager();
        manager.id = managerId;
        attachement.operator = manager;

        data.imgIcon = attachement;
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
    const { parent, siteModel, cover, imgIcon } = updateCategoryDto;
    const data = new Category();
    [
      'id',
      'catname',
      'catnameEn',
      'catdir',
      'description',
      'icon',
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

    // 关联附件-栏目图片icon
    if (isNotEmptyObject(imgIcon)) {
      const attachement = new Attachement();
      const { id, url, size, mimetype } = imgIcon;

      if (id) {
        attachement.id = id;
        const oldIcon = await this.attachementService.findOne(id);
        if (oldIcon.url !== url) {
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

      data.imgIcon = attachement;
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

  /**
   * 根据栏目目录获取栏目信息
   * @param catdir string 栏目目录
   * @returns Object
   */
  findOneByCatdir(catdir: string, relations: string[]) {
    return this.category.findOne({
      where: { catdir },
      relations,
    });
  }

  filterTreeByDisplay(nodes) {
    return nodes
      .flatMap((node) => {
        if (node.display === 1) {
          // 递归处理子节点，然后将当前节点与过滤后的子节点合并
          const filteredChildren = this.filterTreeByDisplay(
            node.children || [],
          );
          // 返回当前节点与子节点数组的组合
          return [{ ...node, children: filteredChildren }];
        } else {
          // 如果当前节点不需要保留，则检查是否有子节点需要处理
          return node.children ? this.filterTreeByDisplay(node.children) : [];
        }
      })
      .filter(Boolean);
  }
}
