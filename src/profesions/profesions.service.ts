import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateProfesionDto } from './dto/create-profesion.dto';
import { UpdateProfesionDto } from './dto/update-profesion.dto';
import { ProfesionsRepository } from './profesions.repository';
import { UserRepository } from 'src/users/users.repository';

@Injectable()
export class ProfesionsService implements OnModuleInit {
  constructor(
    private readonly profesionsRepository: ProfesionsRepository,
    private userRepository: UserRepository,
  ) {}

  async onModuleInit() {
    await this.userRepository.seederUser();
    await this.profesionsRepository.seederProfesions();
  }
  create(createProfesionDto: CreateProfesionDto) {
    return this.profesionsRepository.create(createProfesionDto);
  }

  findAll() {
    return this.profesionsRepository.findAll;
  }

  findAllProfesions(category: string) {
    return this.profesionsRepository.findAllProfesions(category);
  }

  update(id: string, updateProfesionDto: UpdateProfesionDto) {
    return this.profesionsRepository.update(id, updateProfesionDto);
  }

  remove(id: string) {
    return this.profesionsRepository.remove(id);
  }
}
