import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Education } from 'src/database/entities/education.entity';
import { Repository } from 'typeorm';
import * as data from '../../utils/mock-educations.json';
import { EducationState } from 'src/enum/education.enum';
import { UserRepository } from '../users/users.repository';

@Injectable()
export class EducationService implements OnModuleInit {
  constructor(
    @InjectRepository(Education)
    private educationsRepository: Repository<Education>,
    private userRepository: UserRepository,
  ) {}

  onModuleInit() {
    this.seederEducation();
  }
  async seederEducation() {
    const users = await this.userRepository.findAll();

    data?.map(async (element) => {
      const education = new Education();
      education.title = element.title;
      education.educationalEntity = element.educationalEntity;
      education.studiesState = element.studiesState.map(
        (state) => state as EducationState,
      );
      education.startDate = element.startDate;
      education.endDate = element.endDate;
      education.user = users[Math.round(Math.random() * 30)];

      await this.educationsRepository
        .createQueryBuilder()
        .insert()
        .into(Education)
        .values(education)
        .execute();
    });
  }

  async getAllEducations() {
    return await this.educationsRepository.find({ relations: { user: true } });
  }
}
