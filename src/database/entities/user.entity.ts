import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Publicaction } from './publication.entity';
import { Profesion } from './profesion.entity';
import { Credential } from './credentials.entity';
import { Notification } from './notification.entity';
import { Education } from './education.entity';
import { Experience } from './experience.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  lastName: string;

  @Column({ type: 'bigint', unique: true, nullable: false })
  dni: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  country: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  city: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  birthdate: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  bio: string;

  @Column({ default: false })
  availableToWork: boolean;

  @Column({ type: 'simple-array', nullable: true, default: 10 })
  professionalRate: number[];

  @Column({ type: 'boolean', nullable: true, default: true })
  newMember: boolean;

  @OneToOne(() => Credential)
  @JoinColumn({ name: 'credentials_ID' })
  credential: Credential;

  @OneToMany(() => Publicaction, (publicaction) => publicaction.user)
  publicactions: Publicaction[];

  @OneToMany(() => Notification, (notification) => notification.user)
  @JoinColumn({ name: 'notification_ID' })
  notifications: Notification[];

  @OneToMany(() => Profesion, (profesion) => profesion.user)
  @JoinColumn({ name: 'profesion_ID' })
  profesions: Profesion[];

  @OneToMany(() => Education, (education) => education.user)
  educations: Education[];

  @OneToMany(() => Experience, (experice) => experice.client)
  experiences: Experience[];
}
