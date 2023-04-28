import {
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
import { RegisterUserDto } from './validation/RegisterUserDto';
import { UsersService } from '../users/users.service';
import { EmailConfirmationService } from './email/email-confirmation.service';
import ConfirmEmailDto from './validation/ConfirmEmailDto';
import { Roles, Role } from './rbac';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private emailConfirmationService: EmailConfirmationService,
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
    const user = await this.userService.create(registerUserDto);
    await this.emailConfirmationService.sendVerificationLink(user);
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
