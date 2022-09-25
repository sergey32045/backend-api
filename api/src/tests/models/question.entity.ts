import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Test } from './test.entity';
import { Label } from './label.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Answer } from './answer.entity';
import { SessionQuestion } from '../../test-session/models/session.entity';
import { Expose, Transform } from 'class-transformer';
import { Attachment } from './attachment.entity';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiProperty({ example: ' Question text' })
  @Column({ type: 'text', nullable: false })
  question: string;

  @ApiProperty({ example: 'Title question' })
  @Column({ type: 'text', nullable: false })
  title: string;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int' })
  level: number;

  @ApiProperty({ example: true })
  @Column({ type: 'boolean', default: false })
  is_multiselect: boolean;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  @ManyToMany(() => Label)
  @JoinTable({
    name: 'question_label',
    joinColumn: { name: 'question_id' },
    inverseJoinColumn: { name: 'label_id' },
  })
  labels: Label[];

  @Expose({ name: 'testIds' })
  @Transform(({ value }) => {
    const values = value
      ? value.flatMap((test: Test) => {
          return test.id;
        })
      : [];

    return values;
  })
  @ManyToMany(() => Test)
  @JoinTable({
    name: 'question_test',
    joinColumn: { name: 'question_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'test_id', referencedColumnName: 'id' },
  })
  tests: Test[];

  @Expose({ name: 'files' })
  @ManyToMany(() => Attachment)
  @JoinTable({
    name: 'question_attachments',
    joinColumn: { name: 'question_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'attachment_id', referencedColumnName: 'id' },
  })
  attachments: Attachment[];

  @OneToMany(
    () => SessionQuestion,
    (sessionQuestion) => sessionQuestion.question,
  )
  @JoinColumn({ name: 'id', referencedColumnName: 'question_id' })
  public sessionQuestions: SessionQuestion[];
}
