import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from 'src/database/entities/feedback.entity';
import { Repository } from 'typeorm';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

export class FeedbackRepository {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
  ) {}
  async create(feedback: CreateFeedbackDto) {
    const feedbackcreate = await this.feedbackRepository.create(feedback);
    
    await this.feedbackRepository.save(feedbackcreate);

    return feedbackcreate;
  }
  async getAll() {
    const feedback = await this.feedbackRepository.find({
      relations: ['profesion'],
    });
    return feedback;
  }
}
