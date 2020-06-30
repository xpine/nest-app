import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { MenuService } from '../menu/menu.service';
import { Menu } from '../menu/menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), TypeOrmModule.forFeature([Menu])],
  providers: [RoleService, MenuService],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}
