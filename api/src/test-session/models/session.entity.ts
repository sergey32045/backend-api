import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Question } from '../../tests/models/question.entity';
import { Answer } from '../../tests/models/answer.entity';

@Entity('test_sessions')
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unsigned: true, nullable: false })
  test_id: number;

  @ApiProperty({ example: 1 })
  @Column({ unsigned: true, nullable: true })
  user_id: number;

  @ApiProperty({
    example: 'started',
    description: 'status of test session: started, stopped, completed',
  })
  @Column({ type: 'varchar', length: 10 })
  status: string;

  @ManyToMany(() => Question)
  @JoinTable({
    name: 'session_question',
    joinColumn: { name: 'question_id' },
    inverseJoinColumn: { name: 'session_id' },
  })
  questions: Question[];

  @ManyToMany(() => Answer)
  @JoinTable({
    name: 'session_answer',
    joinColumn: { name: 'answer_id' },
    inverseJoinColumn: { name: 'session_id' },
  })
  answers: Answer[];

  @OneToMany(
    () => SessionQuestion,
    (sessionQuestion) => sessionQuestion.session,
  )
  @JoinColumn({ name: 'id', referencedColumnName: 'session_id' })
  public sessionQuestions: SessionQuestion[];

  @OneToMany(() => SessionAnswer, (sessionAnswer) => sessionAnswer.session)
  @JoinColumn({ name: 'id', referencedColumnName: 'session_id' })
  public sessionAnswers: SessionAnswer[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity('session_question')
export class SessionQuestion {
  @PrimaryGeneratedColumn({ unsigned: true })
  question_id: number;

  @Column({ type: 'boolean', default: false })
  is_answered: boolean;

  @Column({ type: 'varchar', length: 36, nullable: false })
  session_id: string;

  @ManyToOne(() => Session, (session) => session.sessionQuestions)
  @JoinColumn({ name: 'session_id', referencedColumnName: 'id' })
  public session: Session;
}

@Entity('session_answer')
export class SessionAnswer {
  @PrimaryGeneratedColumn({ unsigned: true })
  answer_id: number;

  @Column({ type: 'boolean', default: false })
  is_correct: boolean;

  @Column({ type: 'varchar', length: 36, nullable: false })
  session_id: string;

  @ManyToOne(() => Session, (session) => session.sessionAnswers)
  @JoinColumn({ name: 'session_id', referencedColumnName: 'id' })
  public session: Session;
}
