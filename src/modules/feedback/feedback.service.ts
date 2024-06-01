import { Injectable, OnModuleInit } from '@nestjs/common';
import { Feedback } from 'src/database/entities/feedback.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from 'src/database/entities/experience.entity';
import * as data from '../../utils/mock-feedbacks.json';

@Injectable()
export class FeedbackService implements OnModuleInit {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
    @InjectRepository(Experience)
    private experienceRepository: Repository<Experience>,
  ) {}

  async onModuleInit() {
    await this.seederFeedbacks();
  }
  async seederFeedbacks() {
    const experiences = await this.experienceRepository.find();
    data?.map(async (element, index) => {
      const feedback = new Feedback();
      feedback.rate = element.rate;
      feedback.description = element.description;
      feedback.experience = experiences[index];

      await this.feedbackRepository
        .createQueryBuilder()
        .insert()
        .into(Feedback)
        .values(feedback)
        .execute();
    });
  }
}
// constructor(private feedbackRepository: FeedbackRepository) {}
// create(createFeedbackDto: CreateFeedbackDto) {
//   return this.feedbackRepository.create(createFeedbackDto);
// }
// findAll() {
//   return this.feedbackRepository.getAll();
// }
// findOne(id: number) {
//   return `This action returns a #${id} feedback`;
// }
// update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
//   return `This action updates a #${id} feedback`;
// }
// remove(id: number) {
//   return `This action removes a #${id} feedback`;
// }
