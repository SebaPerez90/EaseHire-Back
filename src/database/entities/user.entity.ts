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

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  lastName: string;

  @Column({ type: 'int', unique: true, nullable: false })
  dni: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  country: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  city: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  birthdate: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  bio: string;

  @Column({ default: false })
  availableToWork: boolean;

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
}
