import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, In, Repository } from 'typeorm';
import { CreateLoginLogDto } from './dto/create-login-log.dto';
import { LoginLog } from './entities/login-log.entity';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { queryParams } from './type';

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

  findAll(options: IPaginationOptions, wheres: queryParams) {
    const where: FindOptionsWhere<LoginLog> = {};
    if (wheres.username) {
      where.username = wheres.username;
    }
    if (wheres.createdAt) {
      where.createdAt = Between(wheres.createdAt[0], wheres.createdAt[1]);
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
