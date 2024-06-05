import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessException } from '@app/common';
import { In, Like, Repository } from 'typeorm';
import { isNotEmptyObject } from 'class-validator';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Category } from '../category/entities/category.entity';
import { Document } from './entities/document.entity';
import { Album } from './entities/album.entity';
import { Tag } from '../tag/entities/tag.entity';
import { Content } from './entities/content.entity';
import { Attachement } from '../attachement/entities/attachement.entity';
import { Link } from './entities/link.entity';
import { Manager } from '../manager/entities/manager.entity';
import { AttachementService } from '../attachement/attachement.service';
import { CounterService } from '../counter/counter.service';
import { SencetiveService } from '../sencetive/sencetive.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document) private readonly document: Repository<Document>,
    @InjectRepository(Album) private readonly album: Repository<Album>,
    private readonly categoryService: CategoryService,
    private readonly counterService: CounterService,
    private readonly attachementService: AttachementService,
    private readonly sencetiveService: SencetiveService,
  ) {}

  async create(createDocumentDto: CreateDocumentDto, managerId: number) {
    const document = new Document();
    [
      'title',
      'description',
      'cover',
      'seoTitle',
      'seoKeywords',
      'seoDescription',
      'display',
      'readNum',
      'likeNum',
    ].forEach((v) => {
      if (createDocumentDto[v]) {
        document[v] = createDocumentDto[v];
      }
    });

    // category
    const category = new Category();
    category.id = createDocumentDto.category;
    document.category = category;

    // 关联附件-文章封面
    if (isNotEmptyObject(createDocumentDto.cover)) {
      const { url, size, mimetype } = createDocumentDto.cover;
      if (url) {
        const attachement = new Attachement();
        attachement.url = url;
        attachement.size = size;
        attachement.mimetype = mimetype;
        attachement.operatorType = 1;

        const manager = new Manager();
        manager.id = managerId;
        attachement.operator = manager;

        document.cover = attachement;
      }
    }

    // tag
    if (createDocumentDto.tags) {
      const tags = [];
      createDocumentDto.tags.forEach((v) => {
        const tag = new Tag();
        tag.id = v.id;

        tags.push(tag);
      });
      document.tags = tags;
    }

    // content
    if (createDocumentDto.content) {
      const content = new Content();
      const { text } = await this.sencetiveService.filter(
        createDocumentDto.content.content,
      );
      content.content = text;
      document.content = content;
    }

    // album
    if (createDocumentDto.albums) {
      const albums = [];
      createDocumentDto.albums.forEach((v) => {
        const album = new Album();
        album.listorder = v.listorder;
        album.description = v.description;

        if (isNotEmptyObject(v.img)) {
          const { url, size, mimetype } = v.img;
          const attachement = new Attachement();
          attachement.url = url;
          attachement.size = size;
          attachement.mimetype = mimetype;
          attachement.operatorType = 1;

          const manager = new Manager();
          manager.id = managerId;
          attachement.operator = manager;

          album.img = attachement;
        }

        albums.push(album);
      });
      document.albums = albums;
    }
    // console.log('createDocumentDto', createDocumentDto);
    // link
    if (createDocumentDto.link) {
      const { url, follow, target } = createDocumentDto.link;

      const link = new Link();
      link.url = url;
      link.follow = follow;
      link.target = target;

      document.link = link;
    }

    return this.document.save(document);
  }

  findAllList(catId: number[], options: IPaginationOptions, wheres) {
    const where: any = {
      category: {
        id: In(catId),
      },
    };
    if (wheres.id) {
      where.id = wheres.id;
    }
    if (wheres.title) {
      where.title = Like(`%${wheres.title}%`);
    }
    if (wheres.display) {
      where.display = wheres.display;
    }
    return paginate(this.document, options, {
      where,
      relations: ['cover', 'link', 'albums'],
    });
  }

  /**
   * 获取单页模型内容
   * 先判断是否存在内容，如果存在，直接返回；不存在的话，先创建再返回
   * @param catId 栏目ID number
   */
  async findAllPage(catId: number) {
    // 获取栏目
    const catDetail = await this.categoryService.findOneBy({ id: catId });

    // 设置文档基础信息
    const document = new Document();
    document.title = catDetail.catname;

    // 设置内容
    const content = new Content();
    content.content = catDetail.catname;
    document.content = content;

    // 设置关联信息
    document.category = catDetail;

    // 保存
    return this.document.save(document);
  }

  async findOne(id: number) {
    const content = await this.document.findOne({
      where: { id },
      relations: ['category', 'cover', 'tags', 'content', 'link'],
    });
    if (!content) {
      return null;
    }
    const albums = await this.album.find({
      where: { document: { id } },
      relations: ['img'],
    });
    content.albums = albums;
    return content;
  }

  findOnePage(catId: number) {
    return this.document.findOne({
      where: {
        category: { id: catId },
      },
      relations: ['category', 'tags', 'content'],
    });
  }

  async update(updateDocumentDto: UpdateDocumentDto, managerId: number) {
    const document = new Document();
    [
      'id',
      'title',
      'description',
      'cover',
      'seoTitle',
      'seoKeywords',
      'seoDescription',
      'display',
      'readNum',
      'likeNum',
    ].forEach((v) => {
      if (updateDocumentDto[v]) {
        document[v] = updateDocumentDto[v];
      }
    });

    // category
    const category = new Category();
    category.id = updateDocumentDto.category;
    document.category = category;

    // 关联附件-文章封面
    if (isNotEmptyObject(updateDocumentDto.cover)) {
      const attachement = new Attachement();
      const { id, url, size, mimetype } = updateDocumentDto.cover;
      if (id) {
        attachement.id = id;
        const oldCover = await this.attachementService.findOne(id);
        if (oldCover.url !== url) {
          await this.attachementService.removeFile(id);
        }
      }
      if (url) {
        attachement.url = url;
        attachement.size = size;
        attachement.mimetype = mimetype;
        attachement.operatorType = 1;

        const manager = new Manager();
        manager.id = managerId;
        attachement.operator = manager;

        document.cover = attachement;
      }
    }

    // tag
    const tags = [];
    if (updateDocumentDto.tags) {
      updateDocumentDto.tags.forEach((v) => {
        const tag = new Tag();
        tag.id = v.id;

        tags.push(tag);
      });
    }
    document.tags = tags;

    // content
    if (updateDocumentDto.content) {
      const content = new Content();
      content.id = updateDocumentDto.content.id;

      const { text } = await this.sencetiveService.filter(
        updateDocumentDto.content.content,
      );
      content.content = text;
      document.content = content;
    }

    // album
    if (updateDocumentDto.albums) {
      const albums = [];
      updateDocumentDto.albums.forEach((v) => {
        const album = new Album();
        album.id = v.id;
        album.listorder = v.listorder;
        album.description = v.description;

        if (isNotEmptyObject(v.img)) {
          const { url, size, mimetype } = v.img;
          const attachement = new Attachement();
          attachement.url = url;
          attachement.size = size;
          attachement.mimetype = mimetype;
          attachement.operatorType = 1;

          const manager = new Manager();
          manager.id = managerId;
          attachement.operator = manager;

          album.img = attachement;
        }

        albums.push(album);
      });
      document.albums = albums;
    }

    // link
    if (updateDocumentDto.link) {
      const { id, url, follow, target } = updateDocumentDto.link;

      const link = new Link();
      link.id = id;
      link.url = url;
      link.follow = follow;
      link.target = target;

      document.link = link;
    }

    return this.document.save(document);
  }

  async remove(id: number) {
    const doc = await this.findOne(id);
    if (!doc) {
      throw new BusinessException({ code: 0, message: '数据不存在' });
    }

    return this.document.remove(doc);
  }

  display(id: number, display: number) {
    return this.document.update(id, { display });
  }

  count() {
    return this.document.count();
  }

  async getHot() {
    const tops = await this.counterService.getTop5();
    const ids = tops.map((v) => v.documentId);
    const list = await this.document.findBy({ id: In(ids) });

    return tops.map((v) => {
      const item = list.find((v2) => v2.id === v.documentId);
      return {
        ...v,
        ...item,
      };
    });
  }

  /**
   * 增加阅读数
   * @param id number 文档ID
   * @param readNum number 阅读数
   * @returns void
   */
  increaseRead(id: number, readNum: number) {
    this.document.update(id, { readNum });
  }
}
