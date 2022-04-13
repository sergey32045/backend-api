import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Test } from './test.entity';

@Entity('test_categories')
export class TestCategory {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'tinytext', nullable: false })
  title: string;

  @Column({ type: 'int', unsigned: true, nullable: true })
  @OneToOne(() => TestCategory)
  parent_id: number;

  @OneToMany(() => Test, (test) => test.test_category_id)
  tests: Test[];
}
