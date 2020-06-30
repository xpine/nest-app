import {
  Controller,
  Get,
  Post,
  Body,
  Response,
  HttpStatus,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PageDto } from '../../common/dto/page.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiCode } from 'src/common/enum/api-code.num';
import { RoleService } from '../role/role.service';
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'user',
})
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private roleService: RoleService,
  ) {}
  // 获取当前登录账号的用户信息
  @Get('/')
  async get(@Request() req, @Response() res) {
    console.log(req.user);
    const { id } = req.user;
    const user = await this.userService.findOne(id);
    if (user.role) {
      const role = await this.roleService.findById(user.role.id);
      user.role = role;
    }
    res.status(HttpStatus.OK).json({ code: ApiCode.SUCCESS, data: user });
  }

  @Put('/')
  async put(
    @Body() createUserDto: CreateUserDto,
    @Request() req,
    @Response() res,
  ) {
    const { id } = req.user;
    const user = await this.userService.update(id, createUserDto);
    res.status(HttpStatus.OK).json({ code: ApiCode.SUCCESS, data: user });
  }

  // 分页获取用户列表
  @Get('/page')
  async getPage(@Query() pageDto: PageDto & CreateUserDto, @Response() res) {
    const [users, total] = await this.userService.findPage(pageDto);
    res.status(HttpStatus.OK).json({
      code: ApiCode.SUCCESS,
      data: {
        data: users,
        total,
        page: pageDto.page,
        pageSize: pageDto.page,
      },
    });
  }

  // 创建用户账号
  @Post('/')
  async create(@Body() createUserDto: CreateUserDto, @Response() res) {
    const user = await this.userService.create(createUserDto);
    res.status(HttpStatus.OK).json({
      code: ApiCode.SUCCESS,
      data: user,
    });
  }

  // 编辑用户账号
  @Put('/:id')
  async update(
    @Body() createUserDto: CreateUserDto,
    @Param('id') id,
    @Response() res,
  ) {
    const user = await this.userService.update(id, createUserDto);
    res.status(HttpStatus.OK).json({
      code: ApiCode.SUCCESS,
      data: user,
    });
  }

  // 删除用户账号
  @Delete('/:id')
  async remove(@Param('id') id, @Response() res) {
    const ret = await this.userService.remove(id);
    res.status(HttpStatus.OK).json({
      code: ApiCode.SUCCESS,
      data: ret,
    });
  }
}
