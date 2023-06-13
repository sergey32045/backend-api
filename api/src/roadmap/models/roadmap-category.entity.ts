import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roadmap_category')
export class RoadmapCategory {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Junior Frontend Developer' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({ example: 'active' })
  @Column({ type: 'varchar', length: 50 })
  status: string;
}
