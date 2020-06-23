import {
  Controller,
  UseGuards,
  Get,
  Query,
  Post,
  Body,
  Response,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleService } from './role.service';
import { PageDto } from 'src/common/dto/page.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiCode } from 'src/common/enum/api-code.num';
UseGuards(AuthGuard('jwt'));
@Controller({ path: '/role' })
export class RoleController {
  constructor(private service: RoleService) {}

  @Post('/')
  create(@Body() createDto: CreateRoleDto) {
    return this.service.create(createDto);
  }

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
}
