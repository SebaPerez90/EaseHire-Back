import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from 'src/database/entities/experience.entity';
import { Repository } from 'typeorm';
import * as data from '../../utils/mock-experiences.json';
import { UserRepository } from 'src/modules/users/users.repository';
import { ProfesionsRepository } from 'src/modules/profesions/profesions.repository';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(Experience)
    private experienceRepository: Repository<Experience>,
    private userRepository: UserRepository,
    private profesionRepository: ProfesionsRepository,
  ) {}

  async seedExperiences() {
    const users = await this.userRepository.findAll();
    const professions = await this.profesionRepository.getAllProfessions();

    data?.map(async (element) => {
      const experience = new Experience();
      experience.imgUrl = element.imgUrl;
      experience.company = element.company;
      experience.title = element.title;
      experience.description = element.description;
      experience.startDate = element.startDate;
      experience.endDate = element.endDate;
      experience.profesion = professions[Math.round(Math.random() * 16)];
      experience.client = users[Math.round(Math.random() * 30)];

      await this.experienceRepository
        .createQueryBuilder()
        .insert()
        .into(Experience)
        .values(experience)
        .execute();
    });
  }

  async getExperiences() {
    const experiences = await this.experienceRepository.find({
      relations: { client: true, feedback: true },
    });
    return experiences;
  }
}
