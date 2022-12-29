import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('positions')
export class Position {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;
}
