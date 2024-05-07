import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { compare } from 'bcryptjs';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ManagerService } from '@app/modules/manager/manager.service';
import { BusinessException } from '@app/common';
import { WINSTON_LOGGER, RedisKeys } from '@app/common';
import { LoginLogService } from '@app/modules/login-log/login-log.service';
import Redis from 'ioredis';

@Injectable()
export class AuthService {
  loginFailLimit: number = 5;
  loginFailDelay: number = 60;
  constructor(
    @Inject(WINSTON_LOGGER) private readonly logger,
    @Inject('REDIS') private redis: Redis,
    private readonly configService: ConfigService,
    private readonly managerService: ManagerService,
    private readonly jwtService: JwtService,
    private readonly loginlogService: LoginLogService,
  ) {
    this.loginFailLimit = this.configService.get('loginFailLimit');
    this.loginFailDelay = this.configService.get('loginFailDelay');
  }

  async validateUser(loginAuthDto: LoginAuthDto, loggerInfo): Promise<any> {
    const { username, password, code } = loginAuthDto;

    // 登录次数的key
    const LoginUserKey = RedisKeys.LOGIN_NUMBER + ':' + username;
    // 校验登录失败次数
    const LoginNumber = await this.redis.get(LoginUserKey);
    if (+LoginNumber >= this.loginFailLimit) {
      this.logger.debug('登录失败次数过多', AuthService.name);
      loggerInfo.description = '登录失败次数过多';
      this.loginlogService.create(loggerInfo);
      this.redis.expire(LoginUserKey, this.loginFailDelay);
      throw new BusinessException({
        code: 0,
        message: '登录失败次数过多, 请1分钟后再试',
      });
    }

    // 验证码
    const loginCode = await this.redis.get(RedisKeys.LOGIN_CODE);

    loggerInfo.username = username;

    if (!loginCode) {
      this.logger.debug('验证码过期', AuthService.name);
      loggerInfo.description = '验证码过期';
      this.loginlogService.create(loggerInfo);
      throw new BusinessException({ code: 0, message: '验证码过期' });
    }

    if (code.toLowerCase() !== loginCode.toLowerCase()) {
      this.logger.debug('验证码错误', AuthService.name);
      loggerInfo.description = '验证码错误';
      this.loginlogService.create(loggerInfo);
      throw new BusinessException({ code: 0, message: '验证码错误' });
    }
    const manager = await this.managerService.findOneByUsername(username);

    if (!manager) {
      this.logger.debug(`账号或密码错误: ${username}`, AuthService.name);
      loggerInfo.description = '账号或密码错误';
      this.loginlogService.create(loggerInfo);
      throw new BusinessException({ code: 0, message: '账号或密码错误' });
    }

    // 校验密码
    const isVerifyPass = await compare(password, manager.password);
    if (!isVerifyPass) {
      this.logger.debug(`密码或账号错误: ${username}`, AuthService.name);
      loggerInfo.description = '密码或账号错误';
      this.redis.incr(LoginUserKey);
      this.loginlogService.create(loggerInfo);
      throw new BusinessException({ code: 0, message: '密码或账号错误' });
    }

    loggerInfo.status = 1;
    loggerInfo.description = '登录成功';
    this.loginlogService.create(loggerInfo);

    return {
      username: manager.username,
      id: manager.id,
      roles: manager.roles,
      isAdmin: manager.isAdmin,
    };
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      userId: user.id,
      roles: user.roles,
      isAdmin: user.isAdmin,
    };
    const access_token = this.jwtService.sign(payload);
    this.redis.del(RedisKeys.LOGIN_CODE);
    this.redis.sadd(RedisKeys.USER_TOKEN, access_token);

    return {
      userId: user.id,
      access_token,
    };
  }

  logout(access_token: string) {
    return this.redis.srem(RedisKeys.USER_TOKEN, access_token);
  }
}
