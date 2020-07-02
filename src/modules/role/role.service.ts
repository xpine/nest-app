import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository, Like } from 'typeorm';
import { PageDto } from 'src/common/dto/page.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { MenuService } from '../menu/menu.service';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRep: Repository<Role>,
    private menuService: MenuService,
  ) {}

  async findPage(pageDto: PageDto & CreateRoleDto): Promise<[Role[], Number]> {
    return this.roleRep.findAndCount({
      take: pageDto.pageSize,
      skip: pageDto.page * pageDto.pageSize,
      where: {
        name: Like(`%${pageDto.name || ''}%`),
      },
    });
  }

  create(createDto: CreateRoleDto) {
    const role = this.roleRep.create(createDto);
    return this.roleRep.save(role);
  }

  async update(id: string, createDto: CreateRoleDto) {
    const role = await this.roleRep.findOne(id);
    role.name = createDto.name;
    if (createDto.menuIds) {
      role.menus = await this.menuService.findByIds(createDto.menuIds);
    }
    return this.roleRep.save(role);
  }

  findById(id) {
    return this.roleRep.findOne(id, {
      relations: ['menus'],
    });
  }

  async remove(id: string): Promise<void> {
    await this.roleRep.softDelete(id);
  }
}
