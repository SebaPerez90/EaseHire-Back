import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Publicaction } from './publication.entity';
import { Notification } from './notification.entitu';
import { Profesion } from './profesion.entity';

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

  @Column({ nullable: true })
  availability: boolean;

  @OneToOne(() => Credential)
  @JoinColumn({ name: 'credentials_ID' })
  credential: Credential;

  @OneToMany(() => Publicaction, (publicaction) => publicaction.user)
  @JoinColumn({ name: 'publication_ID' })
  publicactions: Publicaction[];

  @OneToMany(() => Notification, (notification) => notification.user)
  @JoinColumn({ name: 'notification_ID' })
  notifications: Notification[];

  @OneToMany(() => Profesion, (profesion) => profesion.user)
  profesions: Profesion[];
}
