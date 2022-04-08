import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { GoogleOauthGuard } from './google-oauth.guard';
import { AuthService } from '../auth.service';
import {User} from "../../users/user.entity";

@Controller('auth/google')
export class GoogleOauthController {
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req: Request) {
    const { accessToken } = await this.authService.login(req.user as User);
    // res.cookie('jwt', accessToken);
    return { accessToken };
  }
}
