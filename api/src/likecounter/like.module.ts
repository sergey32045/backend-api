import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Like } from './models/like.entity';
import { LikeCounterController } from './controllers/likecounter.controller';
import { LikeCounterService } from './services/likecounter.service';

@Module({
  imports: [TypeOrmModule.forFeature([Like])],
  providers: [LikeCounterService],
  controllers: [LikeCounterController],
  exports: [TypeOrmModule],
})
export class LikeModule {}
