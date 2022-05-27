import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany, ManyToOne, JoinColumn,
} from 'typeorm';
import { Test } from './test.entity';
import {Transform} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

@Entity('test_categories')
export class TestCategory {
  @ApiProperty({ example: 1, description: 'ID' })
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiProperty({ example: 'javascript', description: 'Name of a category' })
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @ApiProperty({ example: 'Javascript', description: 'Title of a category' })
  @Column({ type: 'tinytext', nullable: false })
  title: string;

  @ApiProperty({ example: 1, description: 'Parent category ID' })
  @Column({ type: 'int', unsigned: true, nullable: true })
  parent_id: number;

  @Transform(({ value }) => value ? value.title : null)
  @ManyToOne(type => TestCategory)
  @JoinColumn({ name: 'parent_id' })
  parent: TestCategory;

  @OneToMany(() => Test, (test) => test.test_category_id)
  tests: Test[];
}
