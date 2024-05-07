import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { BusinessException } from '@app/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private moduleRef: ModuleRef) {
    super({
      passReqToCallback: true,
    });
  }

  async validate(
    request: Request,
    username: string,
    password: string,
  ): Promise<any> {
    const body = request.body;
    if (!body.code) {
      throw new BusinessException({ code: 0, message: '请输入验证码' });
    }

    const contextId = ContextIdFactory.getByRequest(request);
    const authService = await this.moduleRef.resolve(AuthService, contextId);

    const loggerInfo = request.loggerInfo;

    const user = await authService.validateUser(
      { username, password, code: body.code },
      loggerInfo,
    );
    if (!user) {
      throw new BusinessException({
        code: 0,
        message: '登录失败，请检查登录信息',
      });
    }
    return user;
  }
}
