import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import {TestsModule} from "./tests/tests.module";

@Module({
  imports: [
    TestsModule,
    ConfigModule.forRoot({
      envFilePath: `src/config/env/.${process.env.NODE_ENV}.env`,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // Use useFactory, useClass, or useExisting
      // to configure the ConnectionOptions.
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('database.host'),
        port: +configService.get<number>('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        database: configService.get('database.db'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        // synchronize shouldn't be used in production - otherwise you can lose production data.
        synchronize: process.env.NODE_ENV != 'production',
        logging: true,
        // autoLoadEntities: true,
      }),
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.SMPT_HOST,
        port: 465,
        ignoreTLS: false,
        secure: true,
        auth: {
          user: process.env.SMPT_USERNAME,
          pass: process.env.SMPT_PASSWORD,
        },
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
