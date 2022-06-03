import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('labels')
export class Label {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;
}
