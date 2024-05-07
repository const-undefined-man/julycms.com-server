import { Injectable } from '@nestjs/common';
import { CreateCounterDto } from './dto/create-counter.dto';
import { Counter } from './entities/counter.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';

@Injectable()
export class CounterService {
  constructor(
    @InjectRepository(Counter) private readonly counter: Repository<Counter>,
  ) {}

  create(createCountDto: CreateCounterDto) {
    return this.counter.save(createCountDto);
  }

  getTop5() {
    return this.counter
      .createQueryBuilder('counter')
      .where('counter.type = :type', { type: 'document' })
      .select('counter.documentId', 'documentId')
      .addSelect('COUNT(counter.id)', 'count')
      .groupBy('counter.documentId')
      .orderBy('count', 'DESC')
      .limit(5)
      .getRawMany();
  }

  async countDocument() {
    const startDate =
      dayjs().subtract(30, 'day').format('YYYY-MM-DD') + ' 00:00:00';
    const endDate =
      dayjs().subtract(1, 'day').format('YYYY-MM-DD') + ' 23:59:59';

    const dates = new Array(30).fill({ date: '', count: 0 }).map((v, k) => {
      return {
        date: dayjs(startDate).add(k, 'day').format('YYYY-MM-DD'),
        count: 0,
      };
    });

    const list = await this.counter
      .createQueryBuilder('counter')
      .where('counter.type = :type', { type: 'document' })
      .andWhere('counter.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .select('DATE(counter.createdAt)', 'date')
      .addSelect('COUNT(counter.id)', 'count')
      .groupBy('date')
      .getRawMany();

    return dates.map((v) => {
      const findRes = list.find(
        (sv) => dayjs(sv.date).format('YYYY-MM-DD') === v.date,
      );
      if (findRes) {
        v.count = findRes.count;
      }
      return v;
    });
  }
}
