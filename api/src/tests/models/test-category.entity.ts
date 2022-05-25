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
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiProperty({ example: 'Javascript', description: 'Category of a test' })
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'tinytext', nullable: false })
  title: string;

  @Column({ type: 'int', unsigned: true, nullable: true })
  parent_id: number;

  @Transform(({ value }) => value ? value.title : null)
  @ManyToOne(type => TestCategory)
  @JoinColumn({ name: 'parent_id' })
  parent: TestCategory;

  @OneToMany(() => Test, (test) => test.test_category_id)
  tests: Test[];
}
