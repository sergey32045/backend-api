import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { Role, Roles } from '../../auth/rbac';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('users')
  @Roles(Role.Admin)
  async getUsers(@Request() req) {
    return this.usersService.findAll();
  }
}
