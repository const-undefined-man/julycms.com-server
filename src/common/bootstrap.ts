import { ValidationPipe, VersioningType } from '@nestjs/common';
import { Request } from 'express';
import helmet from 'helmet';
import { join } from 'path';
import { mw as requestIpMw } from 'request-ip';
import { ResponseInterceptor, HttpFilter } from './';
import { WINSTON_LOGGER } from './winston/winston.module';
import { OperationLogInterceptor } from './interceptors/operation-log.interceptor';

declare const module: any;

const corsOptionsDelegate = (req: Request, callback) => {
  let corsOptions;
  const allowlist = [
    'http://localhost',
    'http://localhost:8080',
    'http://localhost:3001',
  ];
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    // 如果你不需要 Cookie 可以设置为 *
    // credentials 与前端的axios 的withCredentials（XMLHttpRequest.withCredentials）
    // 同时 origin必须设置为访问域 才能正常访问，主要是为了 凭证是 Cookie ，授权标头或 TLS 客户端证书
    corsOptions = { origin: req.header('Origin'), credentials: true };
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }

  callback(null, corsOptions); // callback expects two parameters: error and options
};

export const commonBootstrap = (app) => {
  // 支持版本管理
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // 全局影响拦截
  app.useGlobalInterceptors(new ResponseInterceptor());

  // 全局异常处理
  app.useGlobalFilters(new HttpFilter());

  // 启动全局字段校验，保证请求接口字段校验正确。
  app.useGlobalPipes(new ValidationPipe());

  // 常见Web 漏洞防护
  app.use(
    helmet({
      crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
      // 静态资源保护
      crossOriginResourcePolicy: false,
    }),
  );

  // 启用跨域
  app.enableCors(corsOptionsDelegate);

  // 静态资源目录
  app.useStaticAssets(join(__dirname, 'uploads'), {
    prefix: '/uploads',
  });

  // 操作日志
  app.useGlobalInterceptors(new OperationLogInterceptor());

  // logger
  app.useLogger(app.get(WINSTON_LOGGER));

  // 获取真实 ip
  app.use(requestIpMw({ attributeName: 'ip' }));

  // 热重载
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
};
