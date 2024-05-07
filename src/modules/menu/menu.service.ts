import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { BusinessException } from '@app/common';
import { RoleService } from '../role/role.service';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private readonly menu: TreeRepository<Menu>,
    private readonly roleService: RoleService,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    const menu = new Menu();
    [
      'type',
      'name',
      'icon',
      'mark',
      'componentName',
      'componentRoute',
      'componentPath',
      'listorder',
      'display',
      'style',
    ].forEach((v) => {
      if (createMenuDto[v]) {
        menu[v] = createMenuDto[v];
      }
    });

    // 父级
    if (createMenuDto.parent) {
      const parent = new Menu();
      parent.id = createMenuDto.parent;
      menu.parent = parent;

      // 重制 componentPath; 如果父级菜单和当前添加菜单都是目录，则componentPath为LayPage
      const menuOne = await this.findOne(createMenuDto.parent);
      menu.componentPath =
        createMenuDto.type == 0 && menuOne.type === 0
          ? 'LayPage'
          : createMenuDto.componentPath;
    }

    // 操作按钮
    const actions = [];
    if (createMenuDto.actions) {
      createMenuDto.actions.forEach((v) => {
        const item = {
          type: 1,
          name: v.label,
          mark: v.value,
        };
        actions.push(item);
      });

      menu.children = actions;
    }

    // console.log(menu);
    return this.menu.save(menu);
  }

  findAll() {
    return this.menu.find();
  }

  findMenuTree() {
    return this.menu.findTrees();
  }

  formatTree(menus, permissions) {
    return menus.filter((v) => {
      const hasPermission = permissions.includes(v.mark);

      if (v.children) {
        v.children = this.formatTree(v.children, permissions);
      }

      return hasPermission;
    });
  }

  async findPermissionMenuTree(roles) {
    const roleIds = roles.map((v) => v.id);
    const userRoles = await this.roleService.findByIds(roleIds);
    const roleMenus: Menu[] = userRoles.reduce((total, current) => {
      total.push(...current.menus);
      return total;
    }, []);
    const permissions = roleMenus.map((v) => v.mark);
    const menus = await this.menu.findTrees();
    return this.formatTree(menus, permissions);
  }

  findOne(id: number) {
    return this.menu.findOne({
      where: { id },
      relations: ['parent', 'children'],
    });
  }

  async update(updateMenuDto: UpdateMenuDto) {
    // 菜单
    const menu = new Menu();
    [
      'id',
      'type',
      'name',
      'icon',
      'mark',
      'componentName',
      'componentRoute',
      'componentPath',
      'listorder',
      'display',
      'style',
    ].forEach((v) => {
      if (updateMenuDto[v]) {
        menu[v] = updateMenuDto[v];
      }
    });

    // 父级
    if (updateMenuDto.parent) {
      const parent = new Menu();
      parent.id = updateMenuDto.parent;
      menu.parent = parent;

      // 重制 componentPath; 如果父级菜单和当前添加菜单都是目录，则componentPath为LayPage
      const menuOne = await this.findOne(updateMenuDto.parent);
      menu.componentPath =
        updateMenuDto.type == 0 && menuOne.type === 0
          ? 'LayPage'
          : updateMenuDto.componentPath;
    }

    return this.menu.save(menu);
  }

  async remove(id: number) {
    const menu = await this.findOne(id);
    if (menu.children.length) {
      throw new BusinessException({
        code: 0,
        message: '该菜单有下级菜单，不能删除',
      });
    }

    return this.menu.remove(menu);
  }

  display(id: number, display: number) {
    return this.menu.update(id, { display });
  }

  quickmenu(id: number, quickmenu: number) {
    return this.menu.update(id, { quickmenu });
  }

  listorder(id: number, listorder: number) {
    return this.menu.update(id, { listorder });
  }
}
