import {
  Controller,
  Get,
  Render,
  Request,
  UseGuards,
  Post,
  Response,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './modules/auth/auth.service';
import { ApiCode } from './common/enum/api-code.num';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req, @Response() res) {
    res.status(HttpStatus.OK).json({
      code: ApiCode.SUCCESS,
      data: await this.authService.login(req.user),
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
