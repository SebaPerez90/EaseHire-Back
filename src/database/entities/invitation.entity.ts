import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { JobState } from 'src/enum/job-state.enum';

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

  @Column({ type: 'boolean', nullable: true, default: false })
  isRemote: boolean;

  @Column({ type: 'varchar', nullable: false, length: 20 })
  startDate: string;

  @Column({
    type: 'enum',
    nullable: true,
    enum: JobState,
    default: JobState.PENDING,
  })
  jobState: JobState;

  @ManyToMany(() => User)
  @JoinTable({ joinColumn: { name: 'invitation_owner_ID' } })
  invitationOwner: User[];

  @OneToOne(() => User)
  @JoinColumn({ name: 'employee_ID' })
  employee: User;
}
