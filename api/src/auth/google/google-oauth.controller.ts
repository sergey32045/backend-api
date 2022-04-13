import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { GoogleOauthGuard } from './google-oauth.guard';
import { AuthService } from '../auth.service';
import { User } from '../../users/models/user.entity';

@Controller('auth/google')
export class GoogleOauthController {
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() req) {
    return HttpStatus.OK;
  }

  @Get('redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req: Request) {
    const { accessToken } = await this.authService.login(req.user as User);
    return { accessToken };
  }
}
