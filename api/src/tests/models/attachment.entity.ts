import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('attachments')
export class Attachment {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'text', nullable: false })
  url: string;
}
