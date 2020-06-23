import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, Like } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { PageDto } from '../../common/dto/page.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findByUsername(username) {
    return this.usersRepository.findOne({
      where: {
        username,
      },
    });
  }
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findPage(pageDto: PageDto & CreateUserDto): Promise<[User[], Number]> {
    return this.usersRepository.findAndCount({
      take: pageDto.pageSize,
      skip: pageDto.page * pageDto.pageSize,
      where: {
        username: Like(`%${pageDto.username || ''}%`),
      },
    });
  }

  create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async update(id: string, createUserDto: CreateUserDto) {
    const user = await this.findOne(id);
    if (user) {
      user.username = createUserDto.username;
      user.password = createUserDto.password;
      return this.usersRepository.save(user);
    }
  }
  async remove(id: string): Promise<void> {
    await this.usersRepository.softDelete(id);
  }
}
