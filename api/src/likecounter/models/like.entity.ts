import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('likes')
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10, nullable: false, unique: true })
  source_type: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  username: string;

  @Column({ type: 'int', unsigned: true, nullable: true })
  user_id: number;

  @CreateDateColumn()
  created_at: Date;
}
