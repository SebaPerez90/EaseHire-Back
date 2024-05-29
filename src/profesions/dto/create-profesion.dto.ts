import { Experience } from "src/database/entities/experience.entity";

export class CreateProfesionDto {
  category: string;
  rate: number;
  education?: string;
  experience?: Experience[];
}
