import { Profesion } from 'src/database/entities/profesion.entity';

export class CreateFeedbackDto {
  rate: number;
  description: string;
  profesionId: string;
}
