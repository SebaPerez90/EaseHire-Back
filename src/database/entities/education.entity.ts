import { EducationState } from 'src/enum/education.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profesion } from './profesion.entity';

@Entity({ name: 'educations' })
export class Education {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Column({ type: 'varchar', length: 50 })
  educationalEntity: string;

  @Column({
    type: 'enum',
    enum: EducationState,
    default: EducationState.FINISHED,
  })
  studiesState: EducationState[];

  @Column({ type: 'varchar', length: 50 })
  startDate: string;

  @Column({ type: 'varchar', length: 50 })
  endDate: string;

  @ManyToOne(() => Profesion, (profesion) => profesion.educations)
  @JoinColumn({ name: 'profesion_ID' })
  profesion: Profesion;
}
