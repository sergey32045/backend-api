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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GoogleOauthController } from './google/google-oauth.controller';
import { GoogleOauthStrategy } from './google/google-oauth.strategy';
import { EmailConfirmationService } from './email/email-confirmation.service';
import { SendgridService } from '../email/SendgridService';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      
      useFactory: async (configService: ConfigService) => ({
        secretOrPrivateKey: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: +configService.get<number>('jwt.expiresIn') | 86400
        }
      }),
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
