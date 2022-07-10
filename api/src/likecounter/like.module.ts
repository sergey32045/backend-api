import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Like } from './models/like.entity';
import { LikeCounterController } from './controllers/likecounter.controller';
import { LikeCounterService } from './services/likecounter.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([Like]),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 20,
    }),
  ],
  providers: [
    LikeCounterService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  controllers: [LikeCounterController],
  exports: [TypeOrmModule],
})
export class LikeModule {}
