import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/models/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(username);
    const isMatch = user ? await bcrypt.compare(pass, user.password) : false;
    if (isMatch) {
      const { password, ...result } = user;
      console.log(result, 'result ....');
      return result;
    }
    console.log('dfdfdfd');
    return null;
  }

  async validateUserBySocial(username: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(username);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    console.log(user, 'user KKKK');
    const payload = { username: user.email, sub: user.id, roles: user.roles };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
