import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profesion } from './profesion.entity';

@Entity({ name: 'feedbacks' })
export class Feedback {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'float', default: 5 })
  rate: number;

  @Column({ type: 'varchar', length: 300, nullable: true })
  description: string;

  @ManyToOne(() => Profesion, (profesion) => profesion.feedbacks)
  profesion: Profesion;
}
