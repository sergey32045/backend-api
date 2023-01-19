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
  PrimaryColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Question } from '../../tests/models/question.entity';
import { Answer } from '../../tests/models/answer.entity';
import { Transform } from 'class-transformer';
import { Test } from '../../tests/models/test.entity';

@Entity('test_sessions')
export class Session {
  static START_SESSION = 'started';
  static COMPLETE_SESSION = 'completed';

  @ApiProperty({ example: 1 })
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
    joinColumn: { name: 'session_id' },
    inverseJoinColumn: { name: 'question_id' },
  })
  questions: Question[];

  @ManyToMany(() => Answer)
  @JoinTable({
    name: 'session_answer',
    joinColumn: { name: 'session_id' },
    inverseJoinColumn: { name: 'answer_id' },
  })
  answers: Answer[];

  @Transform(({ value }) => {
    return value.map((sessionQuestion) => {
      if (sessionQuestion?.question?.title) {
        sessionQuestion.question = sessionQuestion.question.title;
      }
      return sessionQuestion;
    });
  })
  @OneToMany(
    () => SessionQuestion,
    (sessionQuestion) => sessionQuestion.session,
  )
  @JoinColumn({ name: 'id', referencedColumnName: 'session_id' })
  public sessionQuestions: SessionQuestion[];

  @OneToMany(() => SessionAnswer, (sessionAnswer) => sessionAnswer.session)
  @JoinColumn({ name: 'id', referencedColumnName: 'session_id' })
  public sessionAnswers: SessionAnswer[];

  @Transform(({ value }) => {
    return value ? value.title : null;
  })
  @ManyToOne(() => Test, (test) => test.sessions)
  @JoinColumn({ name: 'test_id', referencedColumnName: 'id' })
  test: Test;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity('session_question')
export class SessionQuestion {
  @PrimaryColumn({ unsigned: true, type: 'int' })
  question_id: number;

  @Column({ type: 'boolean', default: false })
  is_answered: boolean;

  @Column({ type: 'varchar', length: 36, nullable: false })
  @PrimaryColumn()
  session_id: string;

  @ManyToOne(() => Session, (session) => session.sessionQuestions)
  @JoinColumn({ name: 'session_id', referencedColumnName: 'id' })
  public session: Session;

  @ManyToOne(() => Question, (question) => question.sessionQuestions)
  @JoinColumn({ name: 'question_id', referencedColumnName: 'id' })
  public question: Question;
}

@Entity('session_answer')
export class SessionAnswer {
  @PrimaryColumn({ unsigned: true, type: 'int' })
  answer_id: number;

  @Column({ type: 'boolean', default: false })
  is_correct: boolean;

  @Column({ type: 'varchar', length: 36, nullable: false })
  @PrimaryColumn()
  session_id: string;

  @ManyToOne(() => Session, (session) => session.sessionAnswers)
  @JoinColumn({ name: 'session_id', referencedColumnName: 'id' })
  public session: Session;
}
