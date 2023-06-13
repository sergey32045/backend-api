import { Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { RoadmapCategory } from './roadmap-category.entity';

@Entity('roadmap_category_tree')
export class RoadmapCategoryTree {
  @PrimaryColumn()
  @OneToOne(() => RoadmapCategory, (category) => category.id)
  parent_id: number;

  @PrimaryColumn()
  @OneToOne(() => RoadmapCategory, (category) => category.id)
  child_id: number;
}
