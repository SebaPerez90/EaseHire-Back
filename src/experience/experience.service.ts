import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from 'src/database/entities/experience.entity';
import { Repository } from 'typeorm';
import * as data from '../utils/mock-experiences.json';
import { UserRepository } from 'src/users/users.repository';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(Experience)
    private experienceRepository: Repository<Experience>,
    private userRepository: UserRepository,
  ) {}

  async seedExperiences(client) {
    data?.map(async (element) => {
      const experience = new Experience();
      experience.imgUrl = element.imgUrl;
      experience.company = element.company;
      experience.title = element.title;
      experience.description = element.description;
      experience.startDate = element.startDate;
      experience.endDate = element.endDate;
      //   experience.profesion = element.profesion;
      experience.client = client;

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
      relations: ['client'],
    });
    return experiences;
  }
}
