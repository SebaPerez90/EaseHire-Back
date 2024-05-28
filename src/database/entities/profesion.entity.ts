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

  @Column({ type: 'array', array: true })
  category: string[];

  @Column({ type: 'float' })
  rate: number;

  @Column({ type: 'array', array: true })
  education: string[];

  @OneToMany(() => Experience, (experience) => experience.profesion)
  @JoinColumn({ name: 'experience_ID' })
  experiences: Experience[];

  @ManyToOne(() => User, (user) => user.profesions)
  user: User;
}
