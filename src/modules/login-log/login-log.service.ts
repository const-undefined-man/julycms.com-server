import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, In, Repository } from 'typeorm';
import { CreateLoginLogDto } from './dto/create-login-log.dto';
import { LoginLog } from './entities/login-log.entity';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { QueryLogDto } from './dto/query-log-dto';

@Injectable()
export class LoginLogService {
  constructor(
    @InjectRepository(LoginLog) private readonly loginLog: Repository<LoginLog>,
  ) {}

  create(createLoginLogDto: CreateLoginLogDto) {
    const loginLog = new LoginLog();
    Object.keys(createLoginLogDto).forEach((v) => {
      loginLog[v] = createLoginLogDto[v];
    });
    return this.loginLog.save(loginLog);
  }

  findAll(query: QueryLogDto) {
    const options: IPaginationOptions = {
      page: query.page,
      limit: query.limit,
    };
    const where: FindOptionsWhere<LoginLog> = {};
    if (query.username) {
      where.username = query.username;
    }
    if (query.createdAt) {
      where.createdAt = Between(query.createdAt[0], query.createdAt[1]);
    }
    return paginate(this.loginLog, options, { where });
  }

  remove(id: number) {
    return this.loginLog.delete(id);
  }

  async batchRemove(ids: number[]) {
    const patchs = await this.loginLog.findBy({ id: In(ids) });
    return this.loginLog.remove(patchs);
  }

  clear() {
    return this.loginLog.createQueryBuilder().delete().execute();
  }
}
