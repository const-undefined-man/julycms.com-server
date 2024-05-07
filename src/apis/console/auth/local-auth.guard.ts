import { BusinessException } from '@app/common';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err, user) {
    if (err || !user) {
      throw new BusinessException({
        code: 0,
        message: '登录失败，请检查登录信息',
      });
    }
    return user;
  }
}
