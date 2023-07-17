import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Test } from './test.entity';
  import { TestCategory } from './test-category.entity';
  import { Transform } from 'class-transformer';
  import { ApiProperty } from '@nestjs/swagger';
  import { Session } from '../../test-session/models/session.entity';
  
  @Entity('tests_drafts')
  export class TestDraft {
    @ApiProperty({ example: 1, description: 'ID' })
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;
    
    @ApiProperty({ example: 1, description: 'Test ID' })
    @Column({ unsigned: true })
    test_id: number;
  
    @ApiProperty({ example: 1, description: 'Test category ID' })
    @Column({ unsigned: true, nullable: false })
    test_category_id: number;
  
    @ApiProperty({ example: 'Javascript express test' })
    @Column({ type: 'mediumtext' })
    description: string;
  
    @ApiProperty({ example: 'Javascript' })
    @Column({ type: 'mediumtext', nullable: false })
    title: string;

    @OneToOne(() => Test)
    @JoinColumn({ name: 'test_id', referencedColumnName: 'id' })
    public test: Session[];
  
    @Transform(({ value }) => value.title)
    @ManyToOne((type) => TestCategory)
    @JoinColumn({ name: 'test_category_id' })
    category: TestCategory;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  