import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { TestCategory } from './test-category.entity';
import { Question } from './question.entity';

@Entity('tests')
export class Test {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unsigned: true, nullable: false })
  @OneToOne(() => TestCategory)
  test_category_id: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: false })
  title: string;

  @OneToMany(() => Question, (question) => question.test_id)
  questions: Question[];
}
