import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateProfesionDto } from './dto/create-profesion.dto';
import { UpdateProfesionDto } from './dto/update-profesion.dto';
import { ProfesionsRepository } from './profesions.repository';
import { UserRepository } from 'src/modules/users/users.repository';
import { ExperienceService } from '../experience/experience.service';

@Injectable()
export class ProfesionsService implements OnModuleInit {
  constructor(
    private readonly profesionsRepository: ProfesionsRepository,
    private userRepository: UserRepository,
    private experienceService: ExperienceService,
  ) {}

  async onModuleInit() {
    await this.userRepository.seederUser();
    await this.profesionsRepository.seederProfesions();
    await this.experienceService.seedExperiences();
    await this.userRepository.filterNewMembers();
  }
  create(createProfesionDto: CreateProfesionDto) {
    return this.profesionsRepository.create(createProfesionDto);
  }

  findProfesions(category: string, page: number, limit: number) {
    return this.profesionsRepository.findProfesions(category, page, limit);
  }

  update(id: string, updateProfesionDto: UpdateProfesionDto) {
    return this.profesionsRepository.update(id, updateProfesionDto);
  }

  remove(id: string) {
    return this.profesionsRepository.remove(id);
  }
}
