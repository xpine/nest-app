import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, Like } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { PageDto } from '../../common/dto/page.dto';
import { RoleService } from '../role/role.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private roleService: RoleService,
  ) {}

  findByUsername(username) {
    return this.usersRepository.findOne({
      where: {
        username,
      },
    });
  }

  find(dto: CreateUserDto) {
    return this.usersRepository.find({
      where: {
        username: Like(`%${dto.username || ''}%`),
      },
    });
  }
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  findByIds(ids): Promise<User[]> {
    return this.usersRepository.findByIds(ids);
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id, { relations: ['role'] });
  }

  findPage(pageDto: PageDto & CreateUserDto): Promise<[User[], Number]> {
    return this.usersRepository.findAndCount({
      take: pageDto.pageSize,
      skip: pageDto.page * pageDto.pageSize,
      where: {
        username: Like(`%${pageDto.username || ''}%`),
      },
      relations: ['role'],
      order: {
        createTime: 'DESC',
      },
    });
  }

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    if (createUserDto.roleId) {
      const role = await this.roleService.findById(createUserDto.roleId);
      user.role = role;
    }
    return this.usersRepository.save(user);
  }

  async update(id: string, createUserDto: CreateUserDto) {
    const user = await this.findOne(id);
    if (user) {
      if (createUserDto.roleId) {
        const role = await this.roleService.findById(createUserDto.roleId);
        user.role = role;
      }
      user.username = createUserDto.username;
      user.password = createUserDto.password;
      return this.usersRepository.save(user);
    }
  }
  async remove(id: string): Promise<void> {
    await this.usersRepository.softDelete(id);
  }
}
