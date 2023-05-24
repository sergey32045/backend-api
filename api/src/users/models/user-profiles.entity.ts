import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Position } from './positions.entity';
import { Language } from 'src/languages/models/languages.entity';

@Entity('user_profiles')
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  userId: number;

  @Column({ name: 'full_name' })
  fullName: string;

  @OneToOne(() => Position, (position) => position.id)
  @Column({ name: 'current_position_id', nullable: true })
  currentPositionId: number;

  @OneToOne(() => Position, (position) => position.id)
  @Column({ name: 'target_position_id', nullable: true })
  targetPositionId: number;

  @OneToOne(() => Language, (language) => language.id)
  @Column({ name: 'language_id', nullable: true })
  languageId: number;
}
