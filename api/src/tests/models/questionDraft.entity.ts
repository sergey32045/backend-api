import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    OneToMany,
  } from 'typeorm';
  import { TestDraft } from './testDraft.entity';
  import { Label } from './label.entity';
  import { ApiProperty } from '@nestjs/swagger';
  import { AnswerDraft } from './answerDraft.entity';
  import { Expose, Transform } from 'class-transformer';
  import { Attachment } from './attachment.entity';
  import { ComplexityLevels } from './complexity-levels.entity';
  import { mapEntityToIds } from '../../common/validation.helper';
  
  @Entity('questionDraft')
  export class QuestionDraft {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;
  
    @ApiProperty({ example: ' Question text' })
    @Column({ type: 'text', nullable: false })
    question: string;
  
    @ApiProperty({ example: 'Title question' })
    @Column({ type: 'text', nullable: false })
    title: string;
  
    @ApiProperty({ example: true })
    @Column({ type: 'boolean', default: false })
    is_multiselect: boolean;
  
    @OneToMany(() => AnswerDraft, (answer) => answer.question)
    answers: AnswerDraft[];
  
    @Transform(({ value }) => mapEntityToIds(value))
    @ManyToMany(() => Label)
    @JoinTable({
      name: 'question_label',
      joinColumn: { name: 'question_id' },
      inverseJoinColumn: { name: 'label_id' },
    })
    labels: Label[];
  
    @Expose({ name: 'testIds' })
    @Transform(({ value }) => mapEntityToIds(value))
    @ManyToMany(() => TestDraft)
    @JoinTable({
      name: 'question_test',
      joinColumn: { name: 'question_id', referencedColumnName: 'id' },
      inverseJoinColumn: { name: 'test_id', referencedColumnName: 'id' },
    })
    tests: TestDraft[];
  
    @Expose({ name: 'files' })
    @ManyToMany(() => Attachment)
    @JoinTable({
      name: 'question_attachments',
      joinColumn: { name: 'question_id', referencedColumnName: 'id' },
      inverseJoinColumn: { name: 'attachment_id', referencedColumnName: 'id' },
    })
    attachments: Attachment[];
  
    @Expose({ name: 'positions' })
    @Transform(({ value }) => mapEntityToIds(value))
    @ManyToMany(() => ComplexityLevels)
    @JoinTable({
      name: 'question_positions',
      joinColumn: { name: 'question_id', referencedColumnName: 'id' },
      inverseJoinColumn: { name: 'position_id', referencedColumnName: 'id' },
    })
    positions: ComplexityLevels[];
    
  }
  