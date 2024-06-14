import { RedisKeys } from '@app/common';
import { AttachementService } from '@app/modules/attachement/attachement.service';
import { CategoryService } from '@app/modules/category/category.service';
import { CounterService } from '@app/modules/counter/counter.service';
import { DocumentService } from '@app/modules/document/document.service';
import { TagService } from '@app/modules/tag/tag.service';
import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { create } from 'svg-captcha';

@Injectable()
export class ConsoleService {
  @Inject(DocumentService)
  private documentService: DocumentService;

  @Inject(CategoryService)
  private categoryService: CategoryService;

  @Inject(TagService)
  private tagService: TagService;

  @Inject(AttachementService)
  private attachementService: AttachementService;

  @Inject(CounterService)
  private counterService: CounterService;

  @Inject('REDIS')
  private readonly redis: Redis;

  async createCaptch(codeId: string) {
    const { text, data } = create({
      width: 120,
      height: 36,
      fontSize: 50,
      ignoreChars: 'i1l0oaqg',
    });

    this.redis.set(RedisKeys.LOGIN_CODE + ':' + codeId, text, 'EX', 60 * 1); // 1分钟过期

    return data;
  }

  async dashboard() {
    const documentTotal = await this.documentService.count();
    const categoryTotal = await this.categoryService.count();
    const tagTotal = await this.tagService.count();
    const attachementTotal = await this.attachementService.count();

    const clickCount = await this.counterService.countDocument();

    const categoryCount = await this.categoryService.getCount();

    const hotArticle = await this.documentService.getHot();

    return {
      count: {
        document: documentTotal,
        category: categoryTotal,
        tag: tagTotal,
        attachement: attachementTotal,
      },
      clickCount,
      categoryCount,
      hotArticle,
    };
  }
}
