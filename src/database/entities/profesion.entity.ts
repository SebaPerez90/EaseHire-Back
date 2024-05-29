import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Experience } from './experience.entity';
import { User } from './user.entity';
import { Feedback } from './feedback.entity';

@Entity({ name: 'profesions' })
export class Profesion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ array: true })
  category: string;

  @Column({ array: true, nullable: true })
  education: string;

  @OneToMany(() => Experience, (experience) => experience.profesion)
  experiences: Experience[];

  @ManyToOne(() => User, (user) => user.profesions)
  @JoinColumn({ name: 'user_ID' })
  user: User;

  @OneToMany(() => Feedback, (feedback) => feedback.profesion)
  @JoinColumn({ name: 'profesion_ID' })
  feedbacks: Feedback[];
}
