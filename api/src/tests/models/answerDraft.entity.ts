import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { ApiProperty } from '@nestjs/swagger';
  import { Expose } from 'class-transformer';
  
  import { QuestionDraft } from './questionDraft.entity';
  import { Role } from '../../auth/rbac/role.enum';
  
  @Entity('answerDraft')
  export class AnswerDraft {
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
  
    @ManyToOne(() => QuestionDraft, (question) => question.answers)
    @JoinColumn({ name: 'question_id', referencedColumnName: 'id' })
    question: QuestionDraft;
  }
  