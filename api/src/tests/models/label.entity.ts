import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { TestCategory } from './test-category.entity';

@Entity('labels')
export class Label {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @ApiProperty({ example: 1, description: 'Test category ID' })
  @Column({ unsigned: true, nullable: false })
  category_id: number;

  @Transform(({ value }) => (value ? value.title : ''))
  @ManyToOne((type) => TestCategory)
  @JoinColumn({ name: 'category_id' })
  category: TestCategory;
}
