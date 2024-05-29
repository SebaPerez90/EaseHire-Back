import { Injectable } from '@nestjs/common';
import { CreateProfesionDto } from './dto/create-profesion.dto';
import { UpdateProfesionDto } from './dto/update-profesion.dto';
import { ProfesionsRepository } from './profesions.repository';

@Injectable()
export class ProfesionsService {
  constructor(private readonly profesionsRepository: ProfesionsRepository) {}
  create(createProfesionDto: CreateProfesionDto) {
    return this.profesionsRepository.create(createProfesionDto);
  }

  findAll() {
    return this.profesionsRepository.findAll;
  }

  findAllProfesions(category: string) {
    return this.profesionsRepository.findAllProfesions(category);
  }

  update(id: number, updateProfesionDto: UpdateProfesionDto) {
    return this.profesionsRepository.update(id, updateProfesionDto);
  }

  remove(id: number) {
    return this.profesionsRepository.remove(id);
  }
}
