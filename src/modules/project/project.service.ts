import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRep: Repository<Project>,
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
}
