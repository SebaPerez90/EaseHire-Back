import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateProfesionDto } from './dto/create-profesion.dto';
import { UpdateProfesionDto } from './dto/update-profesion.dto';
import { ProfesionsRepository } from './profesions.repository';
import { UserRepository } from 'src/users/users.repository';

@Injectable()
export class ProfesionsService {
  constructor(private readonly profesionsRepository: ProfesionsRepository) {}
  create(createProfesionDto: CreateProfesionDto) {
    return this.profesionsRepository.create(createProfesionDto);
  }

  findProfesions(category: string, page: number, limit: number) {
    return this.profesionsRepository.findProfesions(category, page, limit);
  }

/*   update(id: string, updateProfesionDto: UpdateProfesionDto) {
    return this.profesionsRepository.update(id, updateProfesionDto);
  }

  remove(id: string) {
    return this.profesionsRepository.remove(id);
  } */
}
