import { PartialType } from '@nestjs/swagger';
import { CreateProfesionDto } from './create-profesion.dto';

export class UpdateProfesionDto extends PartialType(CreateProfesionDto) {
  id: number;
  category?: string;
  rate?: number;
  education?: string;
  experience?: string;
}
