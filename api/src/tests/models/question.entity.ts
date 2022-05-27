import {Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, OneToMany, JoinColumn} from 'typeorm';
import { Test } from './test.entity';

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
  @JoinColumn({name: 'test_id', referencedColumnName: 'id'})
  test: Test;
}
