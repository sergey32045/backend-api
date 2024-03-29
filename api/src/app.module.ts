import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { TestsModule } from './tests/tests.module';
import { SessionsModule } from './test-session/sessions.module';
import { LikeModule } from './likecounter/like.module';
import { RoadmapModule } from './roadmap/roadmap.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    SessionsModule,
    TestsModule,
    LikeModule,
    ConfigModule.forRoot({
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
        synchronize: false,
        logging: true,
      }),
    }),
    AuthModule,
    RoadmapModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD, //  regardless of the module where this construction is employed, the guard is, in fact, global
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
