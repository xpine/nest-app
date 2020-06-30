import {
  Controller,
  Get,
  Response,
  HttpStatus,
  Post,
  Body,
  ValidationPipe,
  Query,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto, UpdateMenuDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiCode } from 'src/common/enum/api-code.num';

// @UseGuards(AuthGuard('jwt'))
@Controller({
  path: '/menu',
})
export class MenuController {
  constructor(private service: MenuService) {}

  @Get('/getMenuTree')
  async getMenuTree(@Body() body, @Response() res) {
    const menus = await this.service.getMenuTree();
    res.status(HttpStatus.OK).json({
      code: ApiCode.SUCCESS,
      data: menus,
    });
  }

  @Get('/getSubMenus')
  async getSubMenus(@Body() body, @Response() res) {
    const { id } = body;
    const menus = await this.service.getSubMenus(id);
    res.status(HttpStatus.OK).json(menus);
  }

  @Post()
  async createMenu(@Body() createMenuDto: CreateMenuDto, @Response() res) {
    const menu = await this.service.create(createMenuDto);
    res.status(HttpStatus.OK).json({
      code: ApiCode.SUCCESS,
      data: menu,
    });
  }

  @Get('/:id')
  async getMenu(@Param() id, @Response() res) {
    const menu = await this.service.getMenu(id);
    res.status(HttpStatus.OK).json(menu);
  }

  @Put('/:id')
  async updateMenu(
    @Param() id,
    @Body() updateDto: UpdateMenuDto,
    @Response() res,
  ) {
    const menu = await this.service.update(id, updateDto);
    res.status(HttpStatus.OK).json(menu);
  }

  @Delete('/:id')
  deleteMenu(@Param() id, @Response() res) {
    const menu = this.service.deleteMenu(id);
    res.status(HttpStatus.OK).json(menu);
  }
}
