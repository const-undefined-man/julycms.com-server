import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { In, Repository } from 'typeorm';
import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { BusinessException } from '@app/common';
import { Menu } from '../menu/entities/menu.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly role: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    // 检查是否存在
    const isHas = await this.findOneByName(createRoleDto.name);
    if (isHas) {
      throw new BusinessException({ code: 0, message: '角色已存在' });
    }

    // 角色数据
    const role = new Role();
    ['name', 'description', 'status'].forEach((v) => {
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

  findAll(options: IPaginationOptions) {
    return paginate(this.role, options);
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
    ['id', 'name', 'description', 'status'].forEach((v) => {
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

  status(id: number, status: number) {
    return this.role.update(id, { status });
  }
}
