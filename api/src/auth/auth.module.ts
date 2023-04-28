require('dotenv').config();
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { GoogleOauthController } from './google/google-oauth.controller';
import { GoogleOauthStrategy } from './google/google-oauth.strategy';
import { EmailConfirmationService } from './email/email-confirmation.service';
import { SendgridService } from '../email/SendgridService';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: process.env.JWT_EXPIRE || '86400s' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    GoogleOauthStrategy,
    EmailConfirmationService,
    SendgridService,
  ],
  controllers: [AuthController, GoogleOauthController],
  exports: [AuthService],
})
export class AuthModule {}
