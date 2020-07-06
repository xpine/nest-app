import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRep: Repository<Project>,
    private userService: UsersService,
  ) {}
  findById(id) {
    return this.projectRep.findOne(id, {
      relations: ['createdBy', 'members'],
    });
  }
  find() {
    return this.projectRep.find();
  }

  update(p: Project) {
    return this.projectRep.save(p);
  }

  async getProjectsByUser(id) {
    const user = await this.userService.findOne(id);
    const ids = user.projects.map(project => project.id);

    return this.projectRep.findByIds(ids, { relations: ['createdBy'] });
  }
}
