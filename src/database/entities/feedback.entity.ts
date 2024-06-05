import {
  Column,
  Entity,
  // JoinColumn,
  // OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { Experience } from './experience.entity';

@Entity({ name: 'feedbacks' })
export class Feedback {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'integer', nullable: false })
  rate: number;

  @Column({ type: 'varchar', length: 300, nullable: true })
  description: string;
}
