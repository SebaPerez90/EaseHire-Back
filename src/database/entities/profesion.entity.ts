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
import { Education } from './education.entity';

@Entity({ name: 'profesions' })
export class Profesion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  category: string;

  @OneToMany(() => Experience, (experience) => experience.profesion)
  experiences: Experience[];

  @ManyToOne(() => User, (user) => user.profesions)
  @JoinColumn({ name: 'user_ID' })
  user: User;

  @OneToMany(() => Feedback, (feedback) => feedback.profesion)
  @JoinColumn({ name: 'profesion_ID' })
  feedbacks: Feedback[];

  @OneToMany(() => Education, (education) => education.profesion)
  educations: Education[];
}
