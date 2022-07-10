import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { LikeCounterService } from '../services/likecounter.service';
import { ApiResponse } from '@nestjs/swagger';
import { Like } from '../models/like.entity';
import { LikeIncrementDto } from '../validation/LikeIncrementDto';
import { LikeQueryDto } from '../validation/LikeQueryDto';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@Controller('like-counter')
export class LikeCounterController {
  constructor(private likeService: LikeCounterService) {}

  // @Throttle(1, 60)
  @UseGuards(ThrottlerGuard)
  @ApiResponse({
    status: 200,
    description: 'Increment like count of a specific content',
    type: Like,
  })
  @Post()
  incrementLike(@Body() data: LikeIncrementDto) {
    return this.likeService.increment(data);
  }

  @Get()
  async getCount(@Query() data: LikeQueryDto) {
    const count = await this.likeService.getCountLikes(data);
    const likes = await this.likeService.getLikes(data);

    return {
      count,
      likes,
    };
  }
}
