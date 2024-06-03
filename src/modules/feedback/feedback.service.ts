import { Injectable } from '@nestjs/common';
import { Feedback } from 'src/database/entities/feedback.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as data from '../../utils/mock-feedbacks.json';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
  ) {}

  async seederFeedbacks() {
    data?.map(async (element) => {
      const feedback = new Feedback();
      feedback.rate = element.rate;
      feedback.description = element.description;

      await this.feedbackRepository.save(feedback);
    });
  }

  async getAllFeedbacks() {
    return await this.feedbackRepository.find();
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
