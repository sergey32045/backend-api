import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import { TestCategory } from './test-category.entity';
import { Question } from './question.entity';
import {Transform} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

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

  @OneToMany(() => Question, (question) => question.test)
  questions: Question[];

  @Transform(({ value }) => value.title)
  @ManyToOne(type => TestCategory)
  @JoinColumn({ name: 'test_category_id' })
  category: TestCategory;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
