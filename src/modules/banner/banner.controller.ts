import { Controller, Get, Body, UseGuards } from '@nestjs/common';
import { PageDto } from 'src/common/dto/page.dto';
import { BannerService } from './banner.service';
import { AuthGuard } from '@nestjs/passport';

@Controller({
  path: '/banner',
})
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get('/list')
  getBannerList(@Body() pageDto: PageDto) {
    return this.bannerService.getBannerList(pageDto);
  }
}
