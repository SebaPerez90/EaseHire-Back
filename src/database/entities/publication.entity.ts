import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'publicactions' })
export class Publicaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  description: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  imgUrl: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  date: string;

  @ManyToOne(() => User, (user) => user.publicactions)
  user: User;
}
