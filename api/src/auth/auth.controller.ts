import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { EmailConfirmationService } from './email/email-confirmation.service';
import { Roles, Role } from './rbac';
import { RegisterUserDto, ConfirmEmailDto } from './validation';
import { UserProfilesService } from 'src/users/user-profiles.service';
import { DataSource } from 'typeorm';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private userProfiles: UserProfilesService,
    private emailConfirmationService: EmailConfirmationService,
    private dataSource: DataSource,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Roles(Role.Guest)
  @Post('login')
  async login(@Request() req): Promise<{ accessToken: string }> {
    return this.authService.login(req.user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Roles(Role.Guest)
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.userService.create(registerUserDto);
      await this.userProfiles.create(registerUserDto, user.id);
      await this.emailConfirmationService.sendVerificationLink(user);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('Error while registering user');
    } finally {
      await queryRunner.release();
    }
  }

  @Post('confirm')
  @Roles(Role.Guest)
  async confirm(@Body() confirmationData: ConfirmEmailDto) {
    const email = await this.emailConfirmationService.decodeConfirmationToken(
      confirmationData.token,
    );
    await this.emailConfirmationService.confirmEmail(email);
  }
}
