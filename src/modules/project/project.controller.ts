import {
  Controller,
  UseGuards,
  Get,
  Response,
  HttpStatus,
  Param,
  Put,
  Body,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiCode } from 'src/common/enum/api-code.num';
import { CreateProjectDto } from './dto/create-project.dto';
import { UsersService } from '../users/users.service';

@UseGuards(AuthGuard('jwt'))
@Controller({
  path: '/project',
})
export class ProjectController {
  constructor(
    private projectService: ProjectService,
    private userService: UsersService,
  ) {}

  @Get('/all')
  async getAllProjects(@Response() res) {
    const projects = await this.projectService.find();
    res.status(HttpStatus.OK).json({
      code: ApiCode.SUCCESS,
      data: projects,
    });
  }

  @Put('/:id')
  async update(
    @Response() res,
    @Param('id') id,
    @Body() updateDto: CreateProjectDto,
  ) {
    const project = await this.projectService.findById(id);
    if (updateDto.memberIds && updateDto.memberIds.length) {
      const users = await this.userService.findByIds(updateDto.memberIds);
      console.log(users, 111, updateDto.memberIds);
      project.members = users;
    }

    res.status(HttpStatus.OK).json({
      code: ApiCode.SUCCESS,
      data: await this.projectService.update(project),
    });
  }

  @Get('/:id')
  async getProject(@Response() res, @Param('id') id) {
    const project = await this.projectService.findById(id);
    res.status(HttpStatus.OK).json({
      code: ApiCode.SUCCESS,
      data: project,
    });
  }
}
