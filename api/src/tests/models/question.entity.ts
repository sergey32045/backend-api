import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Test } from './test.entity';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unsigned: true, nullable: false })
  @OneToOne(() => Test)
  test_id: number;

  @Column({ type: 'text', nullable: false })
  question: string;

  @Column({ type: 'int' })
  level: number;

  @Column({ unsigned: true, nullable: false })
  question_category_id: number;
}
