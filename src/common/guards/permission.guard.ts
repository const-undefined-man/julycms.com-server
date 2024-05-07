import { ReflectMetadataKeys } from '@app/common/constants';
import { Menu } from '@app/modules/menu/entities/menu.entity';
import { Role } from '@app/modules/role/entities/role.entity';
import { RoleService } from '@app/modules/role/role.service';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

declare module 'express' {
  interface Request {
    user: {
      username: string;
      roles: Role[];
      isAdmin: number;
    };
  }
}

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(RoleService)
  private roleService: RoleService;

  @Inject(Reflector)
  private reflector: Reflector;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 开放守卫路由
    const request: Request = context.switchToHttp().getRequest();
    if (request.url.startsWith('/api/pc')) {
      return true;
    }
    if (!request.user || request.user.isAdmin) {
      return true;
    }

    const roleIds = request.user.roles.map((v) => v.id);
    const roles = await this.roleService.findByIds(roleIds);
    const menus: Menu[] = roles.reduce((total, current) => {
      total.push(...current.menus);
      return total;
    }, []);

    // 获取控制器设置的meta权限
    const permissions = this.reflector.getAllAndOverride<string[]>(
      ReflectMetadataKeys.PERMISSION,
      [context.getClass(), context.getHandler()],
    );

    // 如果没有，说明没有权限限制，直接跳过
    if (!permissions) {
      return true;
    }

    // 查找权限
    const isFind = permissions.filter((v) => {
      return menus.find((item) => item.mark === v);
    });
    if (!isFind.length) {
      throw new ForbiddenException('该账号暂无权限，请联系管理员!');
    }

    return true;
  }
}
