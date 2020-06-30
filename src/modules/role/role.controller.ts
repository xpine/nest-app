import {
  Controller,
  UseGuards,
  Get,
  Query,
  Post,
  Body,
  Response,
  HttpStatus,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleService } from './role.service';
import { PageDto } from 'src/common/dto/page.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiCode } from 'src/common/enum/api-code.num';
import { MenuService } from '../menu/menu.service';
@UseGuards(AuthGuard('jwt'))
@Controller({ path: '/role' })
export class RoleController {
  constructor(private service: RoleService, private menuService: MenuService) {}

  @Get('/page')
  async getPage(@Query() pageDto: PageDto & CreateRoleDto, @Response() res) {
    const [roles, total] = await this.service.findPage(pageDto);
    res.status(HttpStatus.OK).json({
      code: ApiCode.SUCCESS,
      data: {
        data: roles,
        total,
        page: pageDto.page,
        pageSize: pageDto.page,
      },
    });
  }

  @Get('/:id')
  async get(@Param('id') id, @Response() res) {
    const role = await this.service.findById(id);
    res.status(HttpStatus.OK).json({
      code: ApiCode.SUCCESS,
      data: role,
    });
  }

  // 编辑角色
  @Put('/:id')
  async update(
    @Body() createRoleDto: CreateRoleDto,
    @Param('id') id,
    @Response() res,
  ) {
    if (createRoleDto.menuIds) {
      createRoleDto.menus = await this.menuService.findByIds(
        createRoleDto.menuIds,
      );
    }
    const role = await this.service.update(id, createRoleDto);
    res.status(HttpStatus.OK).json({
      code: ApiCode.SUCCESS,
      data: role,
    });
  }

  // 删除
  @Delete('/:id')
  async remove(@Param('id') id, @Response() res) {
    const ret = await this.service.remove(id);
    res.status(HttpStatus.OK).json({
      code: ApiCode.SUCCESS,
      data: ret,
    });
  }

  @Post('/')
  async create(@Body() createDto: CreateRoleDto, @Response() res) {
    const role = await this.service.create(createDto);
    res.status(HttpStatus.OK).json({
      code: ApiCode.SUCCESS,
      data: role,
    });
  }
}
