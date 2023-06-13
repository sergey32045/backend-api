import { Module } from '@nestjs/common';
import { RoadmapService } from './roadmap.service';
import { RoadmapController } from './controllers/roadmap.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoadmapCategory } from './models/roadmap-category.entity';
import { RoadmapCategoryTree } from './models/roadmap-tree.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoadmapCategory, RoadmapCategoryTree])],
  providers: [RoadmapService],
  controllers: [RoadmapController],
  exports: [RoadmapService],
})
export class RoadmapModule {}
