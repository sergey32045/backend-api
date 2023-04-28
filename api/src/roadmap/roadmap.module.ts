import { Module } from '@nestjs/common';
import { RoadmapService } from './roadmap.service';
import { RoadmapController } from './controllers/roadmap.controller';

@Module({
  providers: [RoadmapService],
  controllers: [RoadmapController],
  exports: [RoadmapService],
})
export class RoadmapModule {}
