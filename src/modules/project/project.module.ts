import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { Role } from '../role/role.entity';
import { RoleService } from '../role/role.service';
import { MenuService } from '../menu/menu.service';
import { Menu } from '../menu/menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, User, Role, Menu])],
  exports: [ProjectService],
  providers: [ProjectService, UsersService, RoleService, MenuService],
  controllers: [ProjectController],
})
export class ProjectModule {}
