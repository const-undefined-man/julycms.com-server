import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BusinessException } from './business.exception';
import { QueryFailedError } from 'typeorm';
import { I18nContext, I18nValidationException } from 'nestjs-i18n';

@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const error = exception.getResponse();
    const i18n = I18nContext.current(host);

    // 数据操作拦截
    if (exception.constructor === QueryFailedError) {
      response.status(HttpStatus.OK).send({
        data: null,
        code: 0,
        message: (exception as QueryFailedError).message,
      });
      return;
    }

    // 自定义拦截
    if (exception instanceof BusinessException) {
      response.status(HttpStatus.OK).send({
        data: null,
        code: error['code'],
        message: i18n.t(error['message']),
      });
      return;
    }

    // 参数错误拦截
    if (exception instanceof I18nValidationException) {
      console.log('error', exception.errors)
      response.status(HttpStatus.OK).send({
        data: null,
        code: status,
        message: Array.isArray(error['message'])
          ? i18n.t(error['message'][0])
          : '请求错误',
      });
      return;
    }

    response.status(status).send({
      data: null,
      code: status,
      message: exception.message,
    });
  }
}
