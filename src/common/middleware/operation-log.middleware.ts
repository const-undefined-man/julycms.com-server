import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as Bowser from 'bowser';
import { ConfigService } from '@nestjs/config';
import { WINSTON_LOGGER } from '@app/common/winston/winston.module';
import { OperationLogService } from '@app/modules/operation-log/operation-log.service';

@Injectable()
export class OperationLogMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_LOGGER) private readonly logger,
    private readonly configService: ConfigService,
    private readonly operationLogService: OperationLogService,
  ) {}

  async use(req: Request, res: Response, next: () => void) {
    const { os, browser } = Bowser.parse(req.headers['user-agent']);
    const loggerInfo = {
      username: req?.user?.username || '',
      ip: req.ip,
      address: '',
      os: os.name,
      browser: browser.name,
      status: 0,
      module: '',
      operation: '',
      taketime: 0,
    };

    if (this.isLocalIpAddress(loggerInfo.ip)) {
      loggerInfo.address = '本地';
    } else {
      const isv6 = loggerInfo.ip.indexOf('::ffff:');
      loggerInfo.ip =
        isv6 > -1 ? loggerInfo.ip.substring(isv6 + 7) : loggerInfo.ip;
      const ipUrl = this.configService
        .get('ipUrl')
        .replace(':ip', loggerInfo.ip);
      const res = await fetch(ipUrl, { method: 'get' });
      if (res.ok) {
        const {
          code,
          data: { prov, city, district },
        } = await res.json();
        if (code === 'Success') {
          loggerInfo.address = prov + city + district;
        } else {
          loggerInfo.address = '未知';
        }
      } else {
        loggerInfo.address = '未知';
      }
    }

    req.loggerInfo = loggerInfo;

    // 打印请求日志
    this.logger.debug(`${req.method} ${req.originalUrl}`, '>>>>>>>>>');
    this.logger.log(
      `Request query: ${JSON.stringify(req.query)}`,
      'OperationLogMiddleware',
    );
    this.logger.log(
      `Request params: ${JSON.stringify(req.params)}`,
      'OperationLogMiddleware',
    );
    this.logger.log(
      `Request body: ${JSON.stringify(req.body)}`,
      'OperationLogMiddleware',
    );

    const startTime = Date.now();

    // 调用下一个中间件或控制器处理请求
    res.on('finish', () => {
      // 计算并打印响应时间
      const taketime = Date.now() - startTime;
      this.logger.log(
        `${res.statusCode} - Response time: ${taketime}ms`,
        'OperationLogMiddleware',
      );
      this.logger.log(
        `Response body: ${res.locals?.responseData || 'Not available'}`,
        'OperationLogMiddleware',
      );
      this.logger.debug(`${req.method} ${req.originalUrl}`, '<<<<<<<<<');

      loggerInfo.username = req.user?.username || '';
      loggerInfo.status = [200, 304].includes(res.statusCode) ? 1 : 0;
      loggerInfo.taketime = taketime;

      if (loggerInfo.username && loggerInfo.module && loggerInfo.operation) {
        this.operationLogService.create(loggerInfo);
      }
    });

    next();
  }

  isLocalIpAddress(ip: string) {
    const ipParts = ip.split('.').map(Number);

    // 检查是否为环回地址
    if (ip === '127.0.0.1' || ip === '::1') {
      return true;
    }

    // 检查是否为A、B、C类私有地址
    if (
      ipParts[0] === 10 ||
      (ipParts[0] === 172 && ipParts[1] >= 16 && ipParts[1] <= 31) ||
      (ipParts[0] === 192 && ipParts[1] === 168)
    ) {
      return true;
    }

    return false;
  }
}
