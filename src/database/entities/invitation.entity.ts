import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'invitations' })
export class Invitation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 2000, nullable: false })
  jobDescription: string;

  @Column({ type: 'float', nullable: false })
  payPerHour: number;

  @Column({ type: 'varchar', length: 500, nullable: false })
  issue: string;

  @Column({ type: 'varchar', nullable: false, length: 15 })
  location: string;

  @Column({ type: 'boolean', nullable: true })
  isRemote: boolean;

  @Column({ type: 'varchar', nullable: false, length: 20 })
  startDate: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_ID' })
  invitationOwner: User;
}
