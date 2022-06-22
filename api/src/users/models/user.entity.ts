import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  CreateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Role } from '../../auth/rbac/role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @Column({ default: false, name: 'is_email_confirmed' })
  isEmailConfirmed: boolean;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'json', name: 'roles' })
  roles: Role[];

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
