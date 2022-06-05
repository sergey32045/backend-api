import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";
import {Question} from "./question.entity";

@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unsigned: true, nullable: false })
  question_id: number;

  @Column({ type: 'text', nullable: false })
  answer: string;

  @ApiProperty({ example: true })
  @Column({ type: 'boolean', default: false })
  is_correct: boolean

  @ManyToOne(() => Question, (question) => question.answers)
  @JoinColumn({ name: 'question_id', referencedColumnName: 'id' })
  question: Question;
}
