import { Module } from '@nestjs/common';
import { OssFileController } from './file.controller';
import { OssFileService } from './file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OssFile, OssConfig } from './file.entity';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { Role } from '../role/role.entity';
import { Menu } from '../menu/menu.entity';
import { RoleService } from '../role/role.service';
import { MenuService } from '../menu/menu.service';

@Module({
  imports: [TypeOrmModule.forFeature([OssFile, OssConfig, User, Role, Menu])],
  controllers: [OssFileController],
  providers: [OssFileService, UsersService, RoleService, MenuService],
  exports: [OssFileService],
})
export class OssFileModule {}
