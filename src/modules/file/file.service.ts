import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OssFile, OssConfig } from './file.entity';
import { Repository } from 'typeorm';
import { PageDto } from 'src/common/dto/page.dto';
import * as OSS from 'ali-oss';
import { v1 as uuidv1 } from 'uuid';
import * as path from 'path';
import { UsersService } from '../users/users.service';

@Injectable()
export class OssFileService {
  OSSInstance: OSS;
  constructor(
    @InjectRepository(OssFile) private repository: Repository<OssFile>,
    @InjectRepository(OssConfig) private configRep: Repository<OssConfig>,
    private userService: UsersService,
  ) {
    //   this.OSSInstance = new OSS()
    this.configRep.findOne().then(config => {
      this.OSSInstance = new OSS(config);
    });
  }

  findPageByUser(userId, pageDto: PageDto): Promise<[OssFile[], Number]> {
    return this.repository.findAndCount({
      take: pageDto.pageSize,
      skip: pageDto.page * pageDto.pageSize,
      where: {
        createdBy: userId,
      },
      order: {
        createTime: 'DESC',
      },
    });
  }
  findPage(pageDto: PageDto): Promise<[OssFile[], Number]> {
    return this.repository.findAndCount({
      take: pageDto.pageSize,
      skip: pageDto.page * pageDto.pageSize,
      order: {
        createTime: 'DESC',
      },
    });
  }

  async upload(userId, file) {
    const extname = path.extname(file.originalname);
    const name = `img/${uuidv1().replace(/-/g, '')}${extname}`;
    const result = await this.OSSInstance.put(name, file.buffer);
    const f = this.repository.create({
      name: file.originalname,
      size: file.size,
      url: result.url,
      createdBy: await this.userService.findOne(userId),
    });
    return this.repository.save(f);
  }
}
