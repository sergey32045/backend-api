import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CategoryStatus } from './types';
import { InjectRepository } from '@nestjs/typeorm';
import { RoadmapCategory } from './models/roadmap-category.entity';
import { RoadmapCategoryTree } from './models/roadmap-tree.entity';

// @Injectable()
export class RoadmapService {
  constructor(
    @InjectRepository(RoadmapCategory)
    private roadmapCategoryRepository: Repository<RoadmapCategory>,
    @InjectRepository(RoadmapCategoryTree)
    private roadmapTreeRepository: Repository<RoadmapCategoryTree>,
  ) {}

  async getRoadmap(id: number): Promise<any> {
    const res = await this.roadmapCategoryRepository.findOne({
      where: { id: 1 },
    });
    return res;
  }
}
