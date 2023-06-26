import { Repository } from 'typeorm';
import { CategoryStatus } from './types';
import { InjectRepository } from '@nestjs/typeorm';
import { RoadmapCategory } from './models/roadmap-category.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoadmapService {
  constructor(
    @InjectRepository(RoadmapCategory)
    private roadmapCategoryRepository: Repository<RoadmapCategory>,
  ) {}
  async getRoadmap(id: number): Promise<any> {
    const root = await this.roadmapCategoryRepository.findOne({
      where: { id },
    });

    const children = await this.roadmapCategoryRepository
      .createQueryBuilder('cat')
      .leftJoinAndSelect('roadmap_category_tree', 'c', 'c.child_id = cat.id')
      .where('c.parent_id = :id', { id })
      .getMany();

    return this.buildCategoryTree(root, children);
  }

  buildCategoryTree(root: RoadmapCategory, categories: RoadmapCategory[]) {
    const result = {
      id: root.id,
      name: root.name,
      status: root.status,
      children: [],
    };

    const children = categories.filter(
      (category) => category.parentId === root.id,
    );

    for (const child of children) {
      const childNode = this.buildCategoryTree(child, categories);
      result.children.push(childNode);
    }

    return result;
  }
}
