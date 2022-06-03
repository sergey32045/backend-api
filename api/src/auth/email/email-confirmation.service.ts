import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import VerificationTokenPayload from './verification-token-payload.interface';
import { MailerService } from '@nestjs-modules/mailer';
import { jwtConstants, emailConfirmationUrl } from '../constants';
import { User } from '../../users/models/user.entity';
import { UsersService } from '../../users/users.service';
import { SendgridService } from '../../email/SendgridService';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly sendgridService: SendgridService,
    private readonly userService: UsersService,
  ) {}

  public sendVerificationLink(user: User) {
    const { email } = user;
    const payload: VerificationTokenPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: `86400s`,
    });

    return this.sendMail(email, token);
  }

  public sendMail(email: string, token: string) {
    const host = this.configService.get<string>('email.clientHost');
    const url = `${host}${emailConfirmationUrl}?token=${token}`;
    const text = `<h1>Welcome to InterviewBoom! To confirm the email address, click here: ${url}</h1>`;

    const mail = {
      to: email,
      subject: 'Email confirmation',
      html: text,
    };

    return this.sendgridService.send(mail);
  }

  public async confirmEmail(email: string) {
    const user = await this.userService.findOneByEmail(email);
    if (user.isEmailConfirmed) {
      throw new BadRequestException('Email already confirmed');
    }
    await this.userService.markEmailAsConfirmed(email);
  }

  public async decodeConfirmationToken(token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: jwtConstants.secret,
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }
}
