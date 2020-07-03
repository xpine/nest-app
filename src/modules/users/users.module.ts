import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { RoleService } from '../role/role.service';
import { Role } from '../role/role.entity';
import { Menu } from '../menu/menu.entity';
import { MenuService } from '../menu/menu.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Menu])],
  providers: [UsersService, RoleService, MenuService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
