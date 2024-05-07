import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BusinessException } from './business.exception';
import { QueryFailedError } from 'typeorm';

@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const error = exception.getResponse();

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
        message: error['message'],
      });
      return;
    }

    // 参数错误拦截
    if (exception instanceof BadRequestException) {
      response.status(HttpStatus.OK).send({
        data: null,
        code: status,
        message: Array.isArray(error['message'])
          ? error['message'][0]
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
