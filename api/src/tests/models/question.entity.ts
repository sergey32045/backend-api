import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Test } from './test.entity';
import { Label } from './label.entity';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unsigned: true, nullable: false })
  test_id: number;

  @Column({ type: 'text', nullable: false })
  question: string;

  @Column({ type: 'int' })
  level: number;

  @Column({ unsigned: true, nullable: false })
  question_category_id: number;

  @ManyToOne(() => Test, (test) => test.questions)
  @JoinColumn({ name: 'test_id', referencedColumnName: 'id' })
  test: Test;

  @ManyToMany(() => Label)
  @JoinTable({
    name: 'question_label',
    joinColumn: { name: 'question_id' },
    inverseJoinColumn: { name: 'label_id' },
  })
  labels: Label[];
}
