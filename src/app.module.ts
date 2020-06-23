import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { Connection } from 'typeorm';

import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { MenuModule } from './modules/menu/menu.module';
import { Menu } from './modules/menu/menu.entity';
import { User } from './modules/users/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import configuration from './modules/config/configuration';
import { BannerModule } from './modules/banner/banner.module';
import { Banner } from './modules/banner/banner.entity';
import { RoleModule } from './modules/role/role.module';
import { Role } from './modules/role/role.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'test',
      entities: [User, Menu, Banner, Role],
      synchronize: true,
    }),
    UsersModule,
    MenuModule,
    AuthModule,
    BannerModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
