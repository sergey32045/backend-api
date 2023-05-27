import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Put,
  Request,
  Body,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { Role, Roles } from '../../auth/rbac';
import { UserProfilesService } from '../user-profiles.service';
import { UpdateUserProfileDto } from '../validation';

@Controller()
export class UsersController {
  constructor(
    private usersService: UsersService,
    private userProfilesServide: UserProfilesService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('users')
  @Roles(Role.Admin)
  async getUsers(@Request() req) {
    return this.usersService.findAll();
  }

  @Put('user/:id')
  @Roles(Role.Admin, Role.User)
  async updateUser(
    @Body() updateUserProfileDto: UpdateUserProfileDto,
    @Param('id') id: number,
  ) {
    return this.userProfilesServide.update(updateUserProfileDto, id);
  }
}
