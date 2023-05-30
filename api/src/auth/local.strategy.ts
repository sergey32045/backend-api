import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/models/user.entity';
import { LoginDto } from './validation';
import { ValidationError, validate } from 'class-validator';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async isValid(data: LoginDto): Promise<ValidationError[]> {
    const loginDto = new LoginDto();
    loginDto.email = data.email;
    loginDto.password = data.password;
    return await validate(loginDto);
  }

  async validate(email: string, password: string): Promise<User> {
    const errors = await this.isValid({ email, password });
    if (errors && errors.length > 0) {
      const mappedErrors = errors.flatMap((err) => {
        return Object.entries(err.constraints).map(([, value]) => {
          return value;
        });
      });

      throw new BadRequestException(mappedErrors);
    }
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
