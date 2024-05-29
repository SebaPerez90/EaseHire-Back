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

@Entity({ name: 'profesions' })
export class Profesion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ array: true })
  category: string;

  @Column({ type: 'float' })
  rate: number;

  @Column({ array: true })
  education: string;

  @OneToMany(() => Experience, (experience) => experience.profesion)
  experiences: Experience[];

  @ManyToOne(() => User, (user) => user.profesions)
  @JoinColumn({ name: 'user_ID' })
  user: User;
}
