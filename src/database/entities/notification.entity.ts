import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'notifications' })
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 10 })
  time: string;

  @OneToMany(() => User, (user) => user.notifications)
  user: User;
}
