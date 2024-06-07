import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from 'src/database/entities/experience.entity';
import { Repository } from 'typeorm';
import * as data from '../../utils/mock-experiences.json';
import { UserRepository } from 'src/modules/users/users.repository';
import { ProfesionsRepository } from 'src/modules/profesions/profesions.repository';
import { Feedback } from 'src/database/entities/feedback.entity';
import { PostExperienceDto } from './dto/post-exp.dto';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
    @InjectRepository(Experience)
    private experienceRepository: Repository<Experience>,
    private userRepository: UserRepository,
    private profesionRepository: ProfesionsRepository,
  ) {}

  async seedExperiences() {
    const users = await this.userRepository.findAll();
    const professions = await this.profesionRepository.getAllProfessions();
    const feedbacks = await this.feedbackRepository.find();

    data?.map(async (element, index) => {
      const experience = new Experience();
      experience.imgUrl = element.imgUrl;
      experience.company = element.company;
      experience.title = element.title;
      experience.description = element.description;
      experience.startDate = element.startDate;
      experience.endDate = element.endDate;
      experience.profesion = professions[Math.round(Math.random() * 16)];
      experience.client = users[Math.round(Math.random() * 30)];
      experience.feedback = feedbacks[index];

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

  async postExperience(experienceData: PostExperienceDto) {
    const experience = new Experience();
    experience.company = experienceData.company;
    experience.title = experienceData.title;
    experience.description = experienceData.description;
    experience.startDate = experienceData.startDate;
    experience.endDate = experienceData.endDate;

    await this.experienceRepository.save(experience);
  }

  async updateExperience(id, experienceData) {
    const expFounded = await this.experienceRepository.findOneBy({
      id: id,
    });
    if (!expFounded)
      throw new NotFoundException(`No found experience con id ${id}`);

    return await this.experienceRepository.update(id, experienceData);
  }
}
