import { Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Invitation } from './invitation.entity';
import { Feedback } from './feedback.entity';
import { User } from './user.entity';

@Entity({ name: 'work_history' })
export class Work_History {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Invitation)
  invitation: Invitation;

  @ManyToOne(() => User, (user) => user.work_history)
  user: User;

  @OneToOne(() => Feedback)
  feedback: Feedback;
}
