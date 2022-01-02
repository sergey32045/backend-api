import { Controller, Request, Get, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../../auth/local-auth.guard';
import { UsersService } from '../users.service';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Get('users')
  async getUsers(@Request() req) {
    return this.usersService.findAll();
  }
}
