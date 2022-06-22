import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LikeCounterService } from '../services/likecounter.service';
import { ApiResponse } from '@nestjs/swagger';
import { Like } from '../models/like.entity';
import { LikeIncrementDto } from '../validation/LikeIncrementDto';
import { LikeQueryDto } from '../validation/LikeQueryDto';

@Controller('like-counter')
export class LikeCounterController {
  constructor(private likeService: LikeCounterService) {}

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
  getCount(@Query() data: LikeQueryDto) {
    return this.likeService.getCountLikes(data);
  }
}
