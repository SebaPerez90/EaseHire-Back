import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateProfesionDto } from './dto/create-profesion.dto';
import { UpdateProfesionDto } from './dto/update-profesion.dto';
import { ProfesionsRepository } from './profesions.repository';
import { UserRepository } from 'src/modules/users/users.repository';
import { ExperienceService } from '../experience/experience.service';
import { FeedbackService } from '../feedback/feedback.service';

@Injectable()
export class ProfesionsService implements OnModuleInit {
  constructor(
    private readonly profesionsRepository: ProfesionsRepository,
    private userRepository: UserRepository,
    private experienceService: ExperienceService,
    private feedbackService: FeedbackService,
  ) {}
  
  async onModuleInit() {
    await this.userRepository.seederUser();
    await this.feedbackService.seederFeedbacks();
    await this.profesionsRepository.seederProfesions();
    await this.experienceService.seedExperiences();
    await this.userRepository.filterNewMembers();
  }
  async findMe(userid: any) {
    return await this.profesionsRepository.findMe(userid);
  }
  create(createProfesionDto: CreateProfesionDto, userid: string) {
    return this.profesionsRepository.create(createProfesionDto, userid);
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
