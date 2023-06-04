import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('complexity_levels')
export class ComplexityLevels {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;
}
