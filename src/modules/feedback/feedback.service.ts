import { Injectable, NotFoundException } from '@nestjs/common';
import { Feedback } from 'src/database/entities/feedback.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as data from '../../utils/mock-feedbacks.json';
import { PostFeedbackDto } from './dto/create-feedback.dto';
import { UserRepository } from '../users/users.repository';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
    private userRepository: UserRepository,
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
    const feedbacks = await this.feedbackRepository.find();

    if (feedbacks.length === 0)
      throw new NotFoundException('The feedback list is still empty');
    return feedbacks;
  }

  async postFeedback(feedbackData: PostFeedbackDto, req) {
    const user: User = await this.userRepository.findOne(req.user.id);
    const feedback = new Feedback();
    feedback.rate = feedbackData.rate;
    feedback.description = feedbackData.description;
    feedback.user = user;

    await this.feedbackRepository.save(feedback);
    return { message: 'You feebacks has been send successfully' };
  }

  async editFeedback(feedbackData: Partial<Feedback>, id) {
    const feebackFounded: Feedback = await this.feedbackRepository.findOneBy({
      id: id,
    });

    if (!feebackFounded)
      throw new NotFoundException('The feedback is not found or not exists');
    const feedbackUpdates = await this.feedbackRepository.merge(
      feebackFounded,
      feedbackData,
    );

    await this.feedbackRepository.save(feedbackUpdates);

    return {
      message: 'Your feeback has been update successfully',
      feebackFounded,
    };
  }

  /*
  Este necesita revisión porque tiene un problema al ser 
  eliminado por la relacion a la tabla "experiences".
  pendiente a revisión
  */
  async deleteFeedback(id) {
    const feedbackFounded = await this.feedbackRepository.findOneBy({
      id: id,
    });
    if (!feedbackFounded)
      throw new NotFoundException('The feedback was not found or not exists');
    await this.feedbackRepository.remove(feedbackFounded);
    return {
      message: 'Your feedback has benn deleted',
      feedbackFounded,
    };
  }
}
