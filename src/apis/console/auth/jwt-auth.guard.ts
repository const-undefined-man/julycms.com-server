import { RedisKeys, ReflectMetadataKeys } from '@app/common/constants';
import {
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import Redis from 'ioredis';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    @Inject('REDIS') private redis: Redis,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    // 是否放开守卫
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      ReflectMetadataKeys.IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );
    // 开放守卫路由
    const request = context.switchToHttp().getRequest();
    if (isPublic || request.url.startsWith('/api/pc')) {
      return true;
    }

    const res = await super.canActivate(context);
    if (res) {
      const token = request.header('authorization').split(' ')[1];
      const isExist = await this.redis.sismember(RedisKeys.USER_TOKEN, token);

      return isExist ? true : false;
    }
    return false;
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException('Unauthorized');
    }
    return user;
  }
}
