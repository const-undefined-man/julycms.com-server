import { Injectable } from '@nestjs/common';
import { CreateOperationLogDto } from './dto/create-operation-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OperationLog } from './entities/operation-log.entity';
import { Between, FindOptionsWhere, In, Repository } from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { QueryLogDto } from '../login-log/dto/query-log-dto';

@Injectable()
export class OperationLogService {
  @InjectRepository(OperationLog)
  private readonly operationLog: Repository<OperationLog>;

  create(createOperationLogDto: CreateOperationLogDto) {
    return this.operationLog.save(createOperationLogDto);
  }

  findAll(query: QueryLogDto) {
    const options: IPaginationOptions = {
      page: query.page,
      limit: query.limit,
    }
    const where: FindOptionsWhere<OperationLog> = {};
    if (query.username) {
      where.username = query.username;
    }
    if (query.createdAt) {
      where.createdAt = Between(query.createdAt[0], query.createdAt[1]);
    }
    return paginate(this.operationLog, options, { where });
  }

  remove(id: number) {
    return this.operationLog.delete(id);
  }

  async batchRemove(ids: number[]) {
    const patchs = await this.operationLog.findBy({ id: In(ids) });
    return this.operationLog.remove(patchs);
  }

  clear() {
    return this.operationLog.createQueryBuilder().delete().execute();
  }
}
