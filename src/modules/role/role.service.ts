import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository, Like } from 'typeorm';
import { PageDto } from 'src/common/dto/page.dto';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private roleRep: Repository<Role>) {}

  findPage(pageDto: PageDto & CreateRoleDto): Promise<[Role[], Number]> {
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
}
