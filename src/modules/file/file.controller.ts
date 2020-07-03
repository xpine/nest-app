import {
  Controller,
  Get,
  Query,
  Response,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OssFileService } from './file.service';
import { PageDto } from 'src/common/dto/page.dto';
import { ApiCode } from 'src/common/enum/api-code.num';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller({ path: '/file' })
export class OssFileController {
  constructor(private service: OssFileService) {}
  @Get('/page')
  async getPage(@Query() pageDto: PageDto, @Response() res, @Request() req) {
    const { id } = req.user;
    const [users, total] = await this.service.findPageByUser(id, pageDto);
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

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file, @Request() req, @Response() res) {
    const { id } = req.user;
    const ret = await this.service.upload(id, file);
    res.status(HttpStatus.OK).json({
      code: ApiCode.SUCCESS,
      data: ret,
    });
  }
}
