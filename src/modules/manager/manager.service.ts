import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { UpdatePasswordManagerDto } from './dto/update-password-manager.dto';
import { Manager } from './entities/manager.entity';
import { BusinessException } from '@app/common';
import * as bcryptjs from 'bcryptjs';
import { Role } from '../role/entities/role.entity';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Attachement } from '../attachement/entities/attachement.entity';
import { AttachementService } from '../attachement/attachement.service';
import { isNotEmptyObject } from 'class-validator';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(Manager) private readonly manager: Repository<Manager>,
    private readonly attachementService: AttachementService,
  ) {}

  async create(createManagerDto: CreateManagerDto) {
    // 先检查是否存在
    const isHas = await this.findOneByUsername(createManagerDto.username);
    if (isHas) {
      throw new BusinessException({ code: 0, message: 'manage.exist' });
    }

    // 管理员信息
    const manager = new Manager();
    [
      'username',
      'password',
      'realname',
      'email',
      'phoneNumber',
      'lastLoginIp',
    ].forEach((v) => {
      if (createManagerDto[v]) {
        manager[v] = createManagerDto[v];
      }
    });

    // 关联附件-头像
    if (isNotEmptyObject(createManagerDto.avatar)) {
      const attachement = new Attachement();
      attachement.id = createManagerDto.avatar.id;

      manager.avatar = attachement;
    }

    // 关联角色
    const roles = [];
    createManagerDto.roles.forEach((v) => {
      const role = new Role();
      role.id = v.id;
      roles.push(role);
    });
    manager.roles = roles;

    // console.log('manager', manager);
    return this.manager.save(manager);
  }

  findAll(options: IPaginationOptions) {
    return paginate(this.manager, options, {
      relations: ['roles', 'avatar'],
    });
  }

  findOne(id: number) {
    return this.manager.findOne({
      where: { id },
      relations: ['roles', 'avatar'],
    });
  }

  findOneByUsername(username: string) {
    return this.manager.findOne({
      where: { username },
      select: ['id', 'username', 'password', 'createdAt', 'isAdmin'],
      relations: ['roles'],
    });
  }

  async update(updateManagerDto: UpdateManagerDto) {
    // 管理员信息
    const manager = new Manager();
    ['id', 'realname', 'email', 'phoneNumber', 'lastLoginIp'].forEach((v) => {
      manager[v] = updateManagerDto[v];
    });

    // 关联附件-头像
    if (isNotEmptyObject(updateManagerDto.avatar)) {
      const attachement = new Attachement();
      attachement.id = updateManagerDto.avatar.id;

      manager.avatar = attachement;
    }

    // 关联角色
    const roles = [];
    updateManagerDto.roles.forEach((v) => {
      const role = new Role();
      role.id = v.id;
      roles.push(role);
    });
    manager.roles = roles;

    return this.manager.save(manager);
  }

  async remove(id: number) {
    const manager = await this.findOne(id);

    if (manager.avatar) {
      await this.attachementService.remove(manager.avatar.id);
    }

    return this.manager.remove(manager);
  }

  async updatePassword(updatePasswordManagerDto: UpdatePasswordManagerDto) {
    const { id, password, newPassword } = updatePasswordManagerDto;

    // 根据用户id查找用户
    const manager = await this.findOne(+id);
    if (!manager) {
      throw new BusinessException({ code: 0, message: 'manage.absent' });
    }

    // 校验密码
    const isVerify = await bcryptjs.compareSync(password, manager.password);
    if (!isVerify) {
      throw new BusinessException({ code: 0, message: 'manage.pwdError' });
    }

    manager.password = newPassword;
    return this.manager.update(+id, manager);
  }

  async resetPass(id: number) {
    const manager = await this.manager.findOneBy({ id });
    manager.password = 'julycms';
    return this.manager.update(id, manager);
  }
}
