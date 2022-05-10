import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany, ManyToOne, JoinColumn, CreateDateColumn,
} from 'typeorm';
import { TestCategory } from './test-category.entity';
import { Question } from './question.entity';
import {Transform} from "class-transformer";

@Entity('tests')
export class Test {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unsigned: true, nullable: false })
  test_category_id: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: false })
  title: string;

  @ManyToOne(() => Question, (question) => question.test_id)
  questions: Question[];

  @Transform(({ value }) => value.title)
  @ManyToOne(type => TestCategory)
  @JoinColumn({ name: 'test_category_id' })
  category: TestCategory;

  @CreateDateColumn()
  created_at: Date;
}
