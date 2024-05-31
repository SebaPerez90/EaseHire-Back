import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from 'src/database/entities/feedback.entity';
import { Repository } from 'typeorm';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { Profesion } from 'src/database/entities/profesion.entity';
import { User } from 'src/database/entities/user.entity';

export class FeedbackRepository {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
    @InjectRepository(Profesion)
    private profesionRepository: Repository<Profesion>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(feedback: CreateFeedbackDto) {
    const { rate, description, profesionId } = feedback;
    const profesion = await this.profesionRepository.findOne({
      where: { id: profesionId },
    });

    const feedbackcreate = new Feedback();
    feedbackcreate.rate = rate;
    feedbackcreate.description = description;
    feedbackcreate.profesion = profesion;
    await this.feedbackRepository.save(feedbackcreate);

    const user = await this.userRepository.findOne({
      where: { profesions: feedbackcreate.profesion },
    });

    return feedbackcreate;
  }
  async getAll() {
    const feedback = await this.feedbackRepository.find({
      relations: ['profesion', 'profesion.user'],
    });
    return feedback;
  }
}
