import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { NotificationType } from 'src/enum/notification.enum';

@Entity({ name: 'notifications' })
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200, nullable: false })
  title: string;

  @Column({ type: 'enum', enum: NotificationType })
  type: NotificationType;

  @Column({ type: 'varchar', length: 20, nullable: false })
  date: Date | string;

  @Column({ nullable: true })
  time: string;

  @Column({ nullable: true })
  timelapse: string;

  @ManyToOne(() => User, (user) => user.notifications)
  @JoinColumn({ name: 'user_ID' })
  user: User;
}
