import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
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

  @Column({ type: 'int', unique: true, nullable: true })
  dni: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  country: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  birthdate: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  bio: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  email: string;
  @Column({ type: 'varchar', length: 255,nullable: true})
  imgPictureUrl: string;

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
  profesions: Profesion[];

  @OneToMany(() => Education, (education) => education.user)
  educations: Education[];

  @OneToMany(() => Experience, (experice) => experice.client)
  experiences: Experience[];
}
