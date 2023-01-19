import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { Question } from './question.entity';
import { Role } from '../../auth/rbac/role.enum';

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
  @Expose({ groups: [Role.Admin] })
  is_correct: boolean;

  @ManyToOne(() => Question, (question) => question.answers)
  @JoinColumn({ name: 'question_id', referencedColumnName: 'id' })
  question: Question;
}
