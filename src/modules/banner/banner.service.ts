import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Banner } from './banner.entity';
import { CreateBannerDto } from './dto';
import { PageDto } from 'src/common/dto/page.dto';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner) private bannerRep: Repository<Banner>,
  ) {}

  getBannerList(pageDto: PageDto) {
    return this.bannerRep.find();
  }
  getById(id) {
    return this.bannerRep.findOne(id);
  }

  create(dto: CreateBannerDto) {
    const user = this.bannerRep.create(dto);
    return this.bannerRep.save(user);
  }

  update() {}

  delete(id) {
    return this.bannerRep.delete(id);
  }
}
