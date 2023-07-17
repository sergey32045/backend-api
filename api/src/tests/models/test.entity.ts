import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { TestCategory } from './test-category.entity';
import { Question } from './question.entity';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Session } from '../../test-session/models/session.entity';

@Entity('tests')
export class Test {
  @ApiProperty({ example: 1, description: 'ID' })
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiProperty({ example: 1, description: 'Test category ID' })
  @Column({ unsigned: true, nullable: false })
  test_category_id: number;

  @ApiProperty({ example: 'Javascript express test' })
  @Column({ type: 'mediumtext' })
  description: string;

  @ApiProperty({ example: 'Javascript' })
  @Column({ type: 'mediumtext', nullable: false })
  title: string;

  @ManyToMany(() => Question, (question) => question.tests)
  @JoinTable({
    name: 'question_test',
    joinColumn: { name: 'question_id' },
    inverseJoinColumn: { name: 'test_id' },
  })
  questions: Question[];

  @OneToMany(() => Session, (session) => session.test)
  @JoinColumn({ name: 'id', referencedColumnName: 'test_id' })
  public sessions: Session[];

  @Transform(({ value }) => value.title)
  @ManyToOne((type) => TestCategory)
  @JoinColumn({ name: 'test_category_id' })
  category: TestCategory;
  
  @CreateDateColumn()
  created_at: Date;
  
  @UpdateDateColumn()
  updated_at: Date;

  @ApiProperty({ example: true, description: 'Is test published' })
  @Column({ type: 'boolean' })
  is_published: boolean;

  @ApiProperty({ example: true, description: 'Is test has draft' })
  @Column({ type: 'boolean' })
  has_drafts: boolean;
  
}
