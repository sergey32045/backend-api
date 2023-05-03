import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GoogleOauthController } from './google/google-oauth.controller';
import { GoogleOauthStrategy } from './google/google-oauth.strategy';
import { EmailConfirmationService } from './email/email-confirmation.service';
import { SendgridService } from '../email/SendgridService';
import configuration from 'src/config/configuration';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: "secret",
        signOptions: {
          expiresIn: +configService.get<number>('jwt.expiresIn') | 86400
        }
      }),
      inject: [ConfigService],
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
