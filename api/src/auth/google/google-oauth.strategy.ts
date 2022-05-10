import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { randomFillSync } from 'crypto';

import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {
    super({
      // Put config in `.env`
      clientID: configService.get<string>('google.clientId'),
      clientSecret: configService.get<string>('google.clientSecret'),
      callbackURL: configService.get<string>('google.callbackURL'),
      scope: ['email', 'profile'],
    });
  }

  private generatePassword = (
    length = 7,
    wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$',
  ) => {
    return Array.from(randomFillSync(new Uint32Array(length)))
      .map((x) => wishlist[x % wishlist.length])
      .join('');
  };

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ) {
    const { id, name, emails } = profile;
    let user = await this.authService.validateUserBySocial(emails[0].value);
    if (!user) {
      user = await this.usersService.create({
        email: emails[0].value,
        password: this.generatePassword(),
        fullName: name.familyName,
      });
    }
    // Here a custom User object is returned. In the the repo I'm using a UsersService with repository pattern, learn more here: https://docs.nestjs.com/techniques/database
    return user;
  }
}
