import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable, OneToMany,
} from 'typeorm';
import { Test } from './test.entity';
import { Label } from './label.entity';
import {ApiProperty} from "@nestjs/swagger";
import {Answer} from "./answer.entity";

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

  @ApiProperty({ example: true })
  @Column({ type: 'boolean', default: false })
  is_multiselect: boolean

  @ManyToOne(() => Test, (test) => test.questions)
  @JoinColumn({ name: 'test_id', referencedColumnName: 'id' })
  test: Test;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  @ManyToMany(() => Label)
  @JoinTable({
    name: 'question_label',
    joinColumn: { name: 'question_id' },
    inverseJoinColumn: { name: 'label_id' },
  })
  labels: Label[];
}
