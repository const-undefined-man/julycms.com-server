import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { In, Like, Repository } from 'typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { $t, BusinessException } from '@app/common';
import { Menu } from '../menu/entities/menu.entity';
import { QueryRoleDto } from './dto/query-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly role: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    // 检查是否存在
    const isHas = await this.findOneByName(createRoleDto.name);
    if (isHas) {
      const message = $t('common.dataExist', {
        args: { name: createRoleDto.name },
      }) as string;
      throw new BusinessException({ code: 0, message });
    }

    // 角色数据
    const role = new Role();
    ['name', 'description', 'display'].forEach((v) => {
      role[v] = createRoleDto[v];
    });

    // 关联菜单
    if (createRoleDto.menus) {
      const menus = [];
      createRoleDto.menus.forEach((v) => {
        const item = new Menu();
        item.id = v.id;

        menus.push(item);
      });
      role.menus = menus;
    }

    return this.role.save(role);
  }

  findAll(options: QueryRoleDto) {
    const paginationMeta = {
      page: options.page || 1,
      limit: options.limit || 10,
    };
    const where: Record<string, any> = {};
    if (options.display !== undefined) {
      where.display = options.display;
    }
    if (options.name) {
      where.name = Like(`%${options.name}%`);
    }
    return paginate(this.role, paginationMeta, { where });
  }

  findOne(id: number) {
    return this.role.findOne({
      where: { id },
      relations: ['menus', 'managers'],
    });
  }

  findOneByName(name: string) {
    return this.role.findOneBy({ name });
  }

  findByIds(roleIds: number[]) {
    return this.role.find({
      where: {
        id: In(roleIds),
      },
      relations: ['menus'],
    });
  }

  update(updateRoleDto: UpdateRoleDto) {
    const role = new Role();
    ['id', 'name', 'description', 'display'].forEach((v) => {
      role[v] = updateRoleDto[v];
    });

    // 关联菜单
    const menus = [];
    updateRoleDto.menus.forEach((v) => {
      const item = new Menu();
      item.id = v.id;

      menus.push(item);
    });
    role.menus = menus;

    return this.role.save(role);
  }

  remove(id: number) {
    return this.role.delete(id);
  }

  status(id: number, display: number) {
    return this.role.update(id, { display });
  }
}
