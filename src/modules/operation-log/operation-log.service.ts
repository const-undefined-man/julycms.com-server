import { Injectable } from '@nestjs/common';
import { CreateOperationLogDto } from './dto/create-operation-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OperationLog } from './entities/operation-log.entity';
import { Between, FindOptionsWhere, In, Repository } from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { queryParams } from './type';

@Injectable()
export class OperationLogService {
  @InjectRepository(OperationLog)
  private readonly operationLog: Repository<OperationLog>;

  create(createOperationLogDto: CreateOperationLogDto) {
    return this.operationLog.save(createOperationLogDto);
  }

  findAll(options: IPaginationOptions, wheres: queryParams) {
    const where: FindOptionsWhere<OperationLog> = {};
    if (wheres.username) {
      where.username = wheres.username;
    }
    if (wheres.createdAt) {
      where.createdAt = Between(wheres.createdAt[0], wheres.createdAt[1]);
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
